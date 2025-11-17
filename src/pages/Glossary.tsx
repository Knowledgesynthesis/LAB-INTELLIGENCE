import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { glossaryTerms, searchTerms } from '@/data/glossary';
import { Search, BookMarked } from 'lucide-react';

export default function Glossary() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTerms = searchQuery
    ? searchTerms(searchQuery)
    : glossaryTerms;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Glossary</h1>
        <p className="text-muted-foreground mt-2">
          Key terms and concepts in diagnostic reasoning and laboratory stewardship
        </p>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search terms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            {filteredTerms.length} term{filteredTerms.length !== 1 ? 's' : ''} found
          </p>
        </CardContent>
      </Card>

      {/* Terms Grid */}
      <div className="grid gap-4">
        {filteredTerms.map((term) => (
          <Card key={term.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-xl">{term.term}</CardTitle>
                  <CardDescription className="mt-2">{term.definition}</CardDescription>
                </div>
                <BookMarked className="h-5 w-5 text-muted-foreground ml-4" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {term.formula && (
                <div className="p-3 bg-secondary/50 rounded-md font-mono text-sm">
                  {term.formula}
                </div>
              )}
              {term.example && (
                <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-md">
                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-1">
                    Example:
                  </p>
                  <p className="text-sm">{term.example}</p>
                </div>
              )}
              {term.relatedTerms && term.relatedTerms.length > 0 && (
                <div>
                  <p className="text-sm font-medium mb-2">Related Terms:</p>
                  <div className="flex flex-wrap gap-2">
                    {term.relatedTerms.map((relatedId) => {
                      const relatedTerm = glossaryTerms.find(t => t.id === relatedId);
                      return relatedTerm ? (
                        <Badge
                          key={relatedId}
                          variant="outline"
                          className="cursor-pointer"
                          onClick={() => setSearchQuery(relatedTerm.term)}
                        >
                          {relatedTerm.term}
                        </Badge>
                      ) : null;
                    })}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTerms.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No terms found matching "{searchQuery}"</p>
            <button
              onClick={() => setSearchQuery('')}
              className="text-primary underline mt-2"
            >
              Clear search
            </button>
          </CardContent>
        </Card>
      )}

      {/* Quick Reference */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Reference: Key Formulas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 bg-secondary/50 rounded-md">
              <p className="font-medium text-sm mb-1">Positive Likelihood Ratio</p>
              <p className="font-mono text-sm">LR+ = Sensitivity / (1 - Specificity)</p>
            </div>
            <div className="p-3 bg-secondary/50 rounded-md">
              <p className="font-medium text-sm mb-1">Negative Likelihood Ratio</p>
              <p className="font-mono text-sm">LR− = (1 - Sensitivity) / Specificity</p>
            </div>
            <div className="p-3 bg-secondary/50 rounded-md">
              <p className="font-medium text-sm mb-1">Bayesian Update</p>
              <p className="font-mono text-sm">Post-test odds = Pre-test odds × LR</p>
            </div>
            <div className="p-3 bg-secondary/50 rounded-md">
              <p className="font-medium text-sm mb-1">Positive Predictive Value</p>
              <p className="font-mono text-sm">PPV = (Sens × Prev) / [(Sens × Prev) + ((1−Spec) × (1−Prev))]</p>
            </div>
            <div className="p-3 bg-secondary/50 rounded-md">
              <p className="font-medium text-sm mb-1">Negative Predictive Value</p>
              <p className="font-mono text-sm">NPV = (Spec × (1−Prev)) / [(Spec × (1−Prev)) + ((1−Sens) × Prev)]</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
