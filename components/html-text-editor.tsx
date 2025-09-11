"use client"

import type React from "react"
import { useState, useRef, useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
    Bold,
    Italic,
    Underline,
    Strikethrough,
    AlignLeft,
    AlignCenter,
    AlignRight,
    List,
    ListOrdered,
    Quote,
    Undo,
    Redo,
    Download,
    Video,
    Image as ImageIcon,
} from "lucide-react"

interface ToolbarPosition {
    top: number
    left: number
    show: boolean
}

interface SelectedImage {
    element: HTMLImageElement
    originalWidth: number
    originalHeight: number
    isDragging: boolean
    isResizing: boolean
    dragStartX: number
    dragStartY: number
    resizeStartX: number
    resizeStartY: number
    resizeStartWidth: number
    resizeStartHeight: number
}

interface HtmlTextEditorProps {
    value?: string;
    onChange?: (content: string) => void;
    placeholder?: string;
}

export default function HtmlTextEditor({ 
    value = '', 
    onChange, 
    placeholder = "Start writing..." 
}: HtmlTextEditorProps) {
    const [content, setContent] = useState("")
    const [toolbarPosition, setToolbarPosition] = useState<ToolbarPosition>({ top: 0, left: 0, show: false })
    const [selectedText, setSelectedText] = useState("")
    const [selectedImage, setSelectedImage] = useState<SelectedImage | null>(null)
    const [youtubeDialogOpen, setYoutubeDialogOpen] = useState(false)
    const [youtubeUrl, setYoutubeUrl] = useState("")
    const editorRef = useRef<HTMLDivElement>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    // Initialize content from props
    useEffect(() => {
        if (value && editorRef.current && editorRef.current.innerHTML !== value) {
            editorRef.current.innerHTML = value;
            setContent(value);
        }
    }, [value]);

    const handleImageClick = useCallback(
        (e: Event) => {
            const target = e.target as HTMLImageElement
            if (target.tagName === "IMG") {
                e.preventDefault()
                e.stopPropagation()

                if (selectedImage) {
                    selectedImage.element.style.outline = "none"
                    selectedImage.element.style.cursor = "default"
                }

                target.style.outline = "2px solid #6b7280"
                target.style.cursor = "move"

                setSelectedImage({
                    element: target,
                    originalWidth: target.offsetWidth,
                    originalHeight: target.offsetHeight,
                    isDragging: false,
                    isResizing: false,
                    dragStartX: 0,
                    dragStartY: 0,
                    resizeStartX: 0,
                    resizeStartY: 0,
                    resizeStartWidth: 0,
                    resizeStartHeight: 0,
                })

                addResizeHandles(target)
            }
        },
        [selectedImage],
    )

    const addResizeHandles = (img: HTMLImageElement) => {
        document.querySelectorAll(".resize-handle").forEach((handle) => handle.remove())

        const handles = ["nw", "ne", "sw", "se"]
        handles.forEach((position) => {
            const handle = document.createElement("div")
            handle.className = `resize-handle resize-${position}`
            handle.style.cssText = `
        position: absolute;
        width: 8px;
        height: 8px;
        background: #6b7280;
        border: 1px solid white;
        cursor: ${position}-resize;
        z-index: 1000;
      `

            const rect = img.getBoundingClientRect()
            const editorRect = editorRef.current?.getBoundingClientRect()

            if (editorRect) {
                const left = rect.left - editorRect.left
                const top = rect.top - editorRect.top

                switch (position) {
                    case "nw":
                        handle.style.left = `${left - 4}px`
                        handle.style.top = `${top - 4}px`
                        break
                    case "ne":
                        handle.style.left = `${left + rect.width - 4}px`
                        handle.style.top = `${top - 4}px`
                        break
                    case "sw":
                        handle.style.left = `${left - 4}px`
                        handle.style.top = `${top + rect.height - 4}px`
                        break
                    case "se":
                        handle.style.left = `${left + rect.width - 4}px`
                        handle.style.top = `${top + rect.height - 4}px`
                        break
                }
            }

            handle.addEventListener("mousedown", (e) => startResize(e, position))
            editorRef.current?.appendChild(handle)
        })
    }

    const startResize = (e: MouseEvent, position: string) => {
        e.preventDefault()
        e.stopPropagation()

        if (!selectedImage) return

        setSelectedImage((prev) =>
            prev
                ? {
                    ...prev,
                    isResizing: true,
                    resizeStartX: e.clientX,
                    resizeStartY: e.clientY,
                    resizeStartWidth: prev.element.offsetWidth,
                    resizeStartHeight: prev.element.offsetHeight,
                }
                : null,
        )

        const handleMouseMove = (e: MouseEvent) => {
            if (!selectedImage?.isResizing) return

            const deltaX = e.clientX - selectedImage.resizeStartX
            const deltaY = e.clientY - selectedImage.resizeStartY

            let newWidth = selectedImage.resizeStartWidth
            let newHeight = selectedImage.resizeStartHeight

            if (position.includes("e")) newWidth += deltaX
            if (position.includes("w")) newWidth -= deltaX
            if (position.includes("s")) newHeight += deltaY
            if (position.includes("n")) newHeight -= deltaY

            const aspectRatio = selectedImage.originalWidth / selectedImage.originalHeight
            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                newHeight = newWidth / aspectRatio
            } else {
                newWidth = newHeight * aspectRatio
            }

            newWidth = Math.max(50, newWidth)
            newHeight = Math.max(50, newHeight)

            selectedImage.element.style.width = `${newWidth}px`
            selectedImage.element.style.height = `${newHeight}px`

            addResizeHandles(selectedImage.element)
        }

        const handleMouseUp = () => {
            setSelectedImage((prev) => (prev ? { ...prev, isResizing: false } : null))
            document.removeEventListener("mousemove", handleMouseMove)
            document.removeEventListener("mouseup", handleMouseUp)
            updateContent()
        }

        document.addEventListener("mousemove", handleMouseMove)
        document.addEventListener("mouseup", handleMouseUp)
    }

    const handleImageMouseDown = useCallback(
        (e: MouseEvent) => {
            if (!selectedImage || selectedImage.isResizing) return

            const target = e.target as HTMLElement
            if (target.tagName === "IMG" && target === selectedImage.element) {
                e.preventDefault()

                setSelectedImage((prev) =>
                    prev
                        ? {
                            ...prev,
                            isDragging: true,
                            dragStartX: e.clientX,
                            dragStartY: e.clientY,
                        }
                        : null,
                )

                const handleMouseMove = (e: MouseEvent) => {
                    if (!selectedImage?.isDragging) return

                    const deltaX = e.clientX - selectedImage.dragStartX
                    const deltaY = e.clientY - selectedImage.dragStartY

                    selectedImage.element.style.transform = `translate(${deltaX}px, ${deltaY}px)`
                }

                const handleMouseUp = () => {
                    if (selectedImage?.isDragging) {
                        const transform = selectedImage.element.style.transform
                        if (transform) {
                            selectedImage.element.style.transform = ""
                            selectedImage.element.style.position = "relative"
                            const match = transform.match(/translate$$(-?\d+)px, (-?\d+)px$$/)
                            if (match) {
                                selectedImage.element.style.left = `${Number.parseInt(match[1])}px`
                                selectedImage.element.style.top = `${Number.parseInt(match[2])}px`
                            }
                        }
                    }

                    setSelectedImage((prev) => (prev ? { ...prev, isDragging: false } : null))
                    document.removeEventListener("mousemove", handleMouseMove)
                    document.removeEventListener("mouseup", handleMouseUp)
                    updateContent()
                }

                document.addEventListener("mousemove", handleMouseMove)
                document.addEventListener("mouseup", handleMouseUp)
            }
        },
        [selectedImage],
    )

    const clearImageSelection = useCallback(() => {
        if (selectedImage) {
            selectedImage.element.style.outline = "none"
            selectedImage.element.style.cursor = "default"
            document.querySelectorAll(".resize-handle").forEach((handle) => handle.remove())
            setSelectedImage(null)
        }
    }, [selectedImage])

    const formatText = (command: string, value?: string) => {
        document.execCommand(command, false, value)
        editorRef.current?.focus()
        updateContent()
    }

    const formatList = (listType: "ul" | "ol") => {
        const selection = window.getSelection()
        if (selection && selection.rangeCount > 0) {
            const range = selection.getRangeAt(0)

            let currentElement = range.commonAncestorContainer
            if (currentElement.nodeType === Node.TEXT_NODE) {
                currentElement = currentElement.parentElement!
            }

            let listElement: Node | null = currentElement
            while (
                listElement &&
                listElement !== editorRef.current &&
                !["UL", "OL"].includes((listElement as Element).tagName)
            ) {
                const parentElement: HTMLElement | null = (listElement as Element).parentElement
                if (!parentElement) break
                listElement = parentElement
            }

            if (listElement && ["UL", "OL"].includes((listElement as Element).tagName) && listElement.parentNode) {
                if ((listElement as Element).tagName.toLowerCase() === listType) {
                    const items = Array.from((listElement as HTMLElement).querySelectorAll("li"))
                    const fragment = document.createDocumentFragment()

                    items.forEach((item) => {
                        const p = document.createElement("p")
                        p.innerHTML = item.innerHTML
                        fragment.appendChild(p)
                    })

                    if (listElement.parentNode.contains(listElement)) {
                        listElement.parentNode.replaceChild(fragment, listElement)
                    }
                } else {
                    const newList = document.createElement(listType)
                    newList.innerHTML = (listElement as HTMLElement).innerHTML
                    if (listElement.parentNode.contains(listElement)) {
                        listElement.parentNode.replaceChild(newList, listElement)
                    }
                }
            } else {
                const selectedText = selection.toString() || "List item"
                const listHtml = `<${listType}><li>${selectedText}</li></${listType}>`

                range.deleteContents()
                const div = document.createElement("div")
                div.innerHTML = listHtml
                const fragment = document.createDocumentFragment()
                while (div.firstChild) {
                    fragment.appendChild(div.firstChild)
                }
                range.insertNode(fragment)
            }
        }
        updateContent()
    }

    const insertHtml = (html: string) => {
        const selection = window.getSelection()
        if (selection && selection.rangeCount > 0) {
            const range = selection.getRangeAt(0)
            range.deleteContents()
            const div = document.createElement("div")
            div.innerHTML = html
            const fragment = document.createDocumentFragment()
            while (div.firstChild) {
                fragment.appendChild(div.firstChild)
            }
            range.insertNode(fragment)
        }
    }

    const extractYouTubeVideoId = (url: string): string | null => {
        const patterns = [
            /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
            /youtube\.com\/watch\?.*v=([^&\n?#]+)/
        ]
        
        for (const pattern of patterns) {
            const match = url.match(pattern)
            if (match) {
                return match[1]
            }
        }
        return null
    }

    const insertYouTubeVideo = () => {
        if (!youtubeUrl.trim()) return
        
        const videoId = extractYouTubeVideoId(youtubeUrl)
        if (!videoId) {
            alert('Please enter a valid YouTube URL')
            return
        }
        
        const embedHtml = `
            <div style="position: relative; width: 100%; height: 0; padding-bottom: 56.25%; margin: 20px 0; border-radius: 8px; overflow: hidden;">
                <iframe 
                    src="https://www.youtube.com/embed/${videoId}" 
                    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;"
                    allowfullscreen
                    title="YouTube video"
                ></iframe>
            </div>
        `
        
        insertHtml(embedHtml)
        setYoutubeUrl("")
        setYoutubeDialogOpen(false)
        updateContent()
    }
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader()
            reader.onload = (e) => {
                const img = `<img src="${e.target?.result}" alt="Uploaded image" style="max-width: 100%; height: auto; margin: 10px 0; cursor: pointer;" />`
                insertHtml(img)
                updateContent()
            }
            reader.readAsDataURL(file)
        }
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        const files = Array.from(e.dataTransfer.files)
        const imageFile = files.find((file) => file.type.startsWith("image/"))

        if (imageFile) {
            const reader = new FileReader()
            reader.onload = (event) => {
                const img = `<img src="${event.target?.result}" alt="Dropped image" style="max-width: 100%; height: auto; margin: 10px 0; cursor: pointer;" />`
                insertHtml(img)
                updateContent()
            }
            reader.readAsDataURL(imageFile)
        }
    }

    const updateContent = () => {
        if (editorRef.current) {
            const newContent = editorRef.current.innerHTML;
            setContent(newContent);
            if (onChange) {
                onChange(newContent);
            }
        }
    }

    const insertLink = () => {
        const url = prompt("Enter URL:")
        if (url && selectedText) {
            formatText("createLink", url)
            updateContent()
        }
    }

    const downloadHtml = () => {
        const htmlContent = `
<div>
    ${content}
</div>`

        const blob = new Blob([htmlContent], { type: "text/html" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = "article.html"
        a.click()
        URL.revokeObjectURL(url)
    }

    useEffect(() => {
        const editor = editorRef.current
        if (!editor) return

        editor.addEventListener("click", handleImageClick)
        editor.addEventListener("mousedown", handleImageMouseDown)

        const handleDocumentClick = (e: Event) => {
            const target = e.target as HTMLElement
            if (!target.closest("[contenteditable]") && !target.classList.contains("resize-handle")) {
                clearImageSelection()
            }
        }

        document.addEventListener("click", handleDocumentClick)

        return () => {
            editor.removeEventListener("click", handleImageClick)
            editor.removeEventListener("mousedown", handleImageMouseDown)
            document.removeEventListener("click", handleDocumentClick)
        }
    }, [handleImageClick, handleImageMouseDown, clearImageSelection])

    return (
        <div className="min-h-screen bg-background p-4">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold text-foreground">HTML Article Editor</h1>
                    <div className="flex gap-2">
                        <Button onClick={downloadHtml} size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Download HTML
                        </Button>
                    </div>
                </div>

                <Card className="p-4 mb-4">
                    <div className="flex flex-wrap gap-2">
                        <div className="flex gap-1">
                            <Button variant="ghost" size="sm" onClick={() => formatText("undo")}>
                                <Undo className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => formatText("redo")}>
                                <Redo className="w-4 h-4" />
                            </Button>
                        </div>

                        <Separator orientation="vertical" className="h-8" />

                        <div className="flex gap-1">
                            <Button variant="ghost" size="sm" onClick={() => formatText("bold")}>
                                <Bold className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => formatText("italic")}>
                                <Italic className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => formatText("underline")}>
                                <Underline className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => formatText("strikeThrough")}>
                                <Strikethrough className="w-4 h-4" />
                            </Button>
                        </div>

                        <Separator orientation="vertical" className="h-8" />

                        <div className="flex gap-1">
                            <Button variant="ghost" size="sm" onClick={() => formatText("justifyLeft")}>
                                <AlignLeft className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => formatText("justifyCenter")}>
                                <AlignCenter className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => formatText("justifyRight")}>
                                <AlignRight className="w-4 h-4" />
                            </Button>
                        </div>

                        <Separator orientation="vertical" className="h-8" />

                        <div className="flex gap-1">
                            <Button variant="ghost" size="sm" onClick={() => formatList("ul")}>
                                <List className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => formatList("ol")}>
                                <ListOrdered className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => formatText("formatBlock", "blockquote")}>
                                <Quote className="w-4 h-4" />
                            </Button>
                        </div>

                        <Separator orientation="vertical" className="h-8" />

                        <div className="flex gap-1">
                            <Button variant="ghost" size="sm" onClick={() => fileInputRef.current?.click()}>
                                <ImageIcon className="h-4 w-4" />
                            </Button>
                            <Dialog open={youtubeDialogOpen} onOpenChange={setYoutubeDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                        <Video className="h-4 w-4" />
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-md">
                                    <DialogHeader>
                                        <DialogTitle>Insert YouTube Video</DialogTitle>
                                    </DialogHeader>
                                    <div className="space-y-4">
                                        <div>
                                            <Label htmlFor="youtube-url">YouTube URL</Label>
                                            <Input
                                                id="youtube-url"
                                                value={youtubeUrl}
                                                onChange={(e) => setYoutubeUrl(e.target.value)}
                                                placeholder="https://www.youtube.com/watch?v=..."
                                                className="mt-1"
                                            />
                                            <p className="text-xs text-gray-500 mt-1">
                                                Supports youtube.com/watch, youtu.be, and youtube.com/embed URLs
                                            </p>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button onClick={insertYouTubeVideo} className="flex-1">
                                                Insert Video
                                            </Button>
                                            <Button 
                                                variant="outline" 
                                                onClick={() => {
                                                    setYoutubeUrl("")
                                                    setYoutubeDialogOpen(false)
                                                }}
                                                className="flex-1"
                                            >
                                                Cancel
                                            </Button>
                                        </div>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                </Card>

                <Card className="relative">
                    <div
                        ref={editorRef}
                        contentEditable
                        className="p-6 min-h-[500px] outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-lg"
                        style={{ lineHeight: "1.6" }}
                        onInput={updateContent}
                        onDrop={handleDrop}
                        onDragOver={(e) => e.preventDefault()}
                        data-placeholder={placeholder}
                        suppressContentEditableWarning={true}
                    />
                </Card>

                <input 
                    ref={fileInputRef} 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageUpload} 
                    className="hidden" 
                    aria-label="Upload image file"
                />
            </div>
        </div>
    )
}
