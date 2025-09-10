'use client';

import { useState, useEffect } from 'react';
import { Calendar, Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

interface NewsYearFilterProps {
  onYearChange: (year: string) => void;
  selectedYear: string;
  availableYears: number[];
}

export function NewsYearFilter({ onYearChange, selectedYear, availableYears }: NewsYearFilterProps) {
  return (
    <div className="flex items-center gap-4">
      <Select value={selectedYear} onValueChange={onYearChange}>
        <SelectTrigger className="w-48">
          <Calendar className="h-4 w-4 mr-2" />
          <SelectValue placeholder="Filter by year" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Years</SelectItem>
          {availableYears.map(year => (
            <SelectItem key={year} value={year.toString()}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {selectedYear !== 'all' && (
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onYearChange('all')}
        >
          Clear Year Filter
        </Button>
      )}
    </div>
  );
}