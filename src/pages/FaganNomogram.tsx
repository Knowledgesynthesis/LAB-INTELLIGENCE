import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { calculatePostTestProbability, formatProbability, probabilityToOdds } from '@/utils/bayesian';

export default function FaganNomogram() {
  const [preTestProbability, setPreTestProbability] = useState(0.3);
  const [likelihoodRatio, setLikelihoodRatio] = useState(5);

  const postTestProbability = calculatePostTestProbability(preTestProbability, likelihoodRatio);
  const preTestOdds = probabilityToOdds(preTestProbability);
  const postTestOdds = preTestOdds * likelihoodRatio;

  // Calculate positions for the nomogram visualization
  const preTestY = 100 - (preTestProbability * 100);
  const postTestY = 100 - (postTestProbability * 100);
  const lrY = 50 - (Math.log10(likelihoodRatio) * 20); // Logarithmic scale

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Fagan Nomogram</h1>
        <p className="text-muted-foreground mt-2">
          Visual tool for converting pre-test to post-test probability using likelihood ratios
        </p>
      </div>

      {/* Controls */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Pre-Test Probability</CardTitle>
            <CardDescription>Probability before the test</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-primary">
                {formatProbability(preTestProbability)}
              </span>
            </div>
            <Slider
              value={preTestProbability * 100}
              onChange={(value) => setPreTestProbability(value / 100)}
              min={1}
              max={99}
              step={1}
            />
            <p className="text-sm text-muted-foreground">
              Pre-test odds: {preTestOdds.toFixed(2)}:1
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Likelihood Ratio</CardTitle>
            <CardDescription>Test's discriminatory power</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="number"
              value={likelihoodRatio}
              onChange={(e) => setLikelihoodRatio(Math.max(0.01, parseFloat(e.target.value) || 0.01))}
              step={0.1}
              min={0.01}
              className="text-2xl font-bold"
            />
            <p className="text-sm text-muted-foreground">
              {likelihoodRatio > 1 ? 'Positive' : 'Negative'} likelihood ratio
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Nomogram Visualization */}
      <Card>
        <CardHeader>
          <CardTitle>Fagan Nomogram</CardTitle>
          <CardDescription>
            Draw a line from pre-test probability through likelihood ratio to find post-test probability
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative h-96 bg-secondary/20 rounded-lg p-8">
            <svg className="w-full h-full" viewBox="0 0 300 100" preserveAspectRatio="none">
              {/* Pre-test probability axis */}
              <line x1="10" y1="0" x2="10" y2="100" stroke="currentColor" strokeWidth="0.5" />
              <text x="5" y="5" fontSize="4" textAnchor="end">99%</text>
              <text x="5" y="52" fontSize="4" textAnchor="end">50%</text>
              <text x="5" y="98" fontSize="4" textAnchor="end">1%</text>
              <text x="10" y="-2" fontSize="3" textAnchor="middle" className="fill-muted-foreground">Pre-Test</text>

              {/* Likelihood ratio axis (middle) */}
              <line x1="150" y1="10" x2="150" y2="90" stroke="currentColor" strokeWidth="0.5" />
              <text x="155" y="12" fontSize="4">1000</text>
              <text x="155" y="30" fontSize="4">10</text>
              <text x="155" y="52" fontSize="4">1</text>
              <text x="155" y="70" fontSize="4">0.1</text>
              <text x="155" y="88" fontSize="4">0.001</text>
              <text x="150" y="5" fontSize="3" textAnchor="middle" className="fill-muted-foreground">LR</text>

              {/* Post-test probability axis */}
              <line x1="290" y1="0" x2="290" y2="100" stroke="currentColor" strokeWidth="0.5" />
              <text x="295" y="5" fontSize="4">99%</text>
              <text x="295" y="52" fontSize="4">50%</text>
              <text x="295" y="98" fontSize="4">1%</text>
              <text x="290" y="-2" fontSize="3" textAnchor="middle" className="fill-muted-foreground">Post-Test</text>

              {/* Connecting line */}
              <line
                x1="10"
                y1={preTestY}
                x2="150"
                y2={lrY}
                stroke="#3b82f6"
                strokeWidth="1"
                strokeDasharray="2,2"
              />
              <line
                x1="150"
                y1={lrY}
                x2="290"
                y2={postTestY}
                stroke="#3b82f6"
                strokeWidth="1"
                strokeDasharray="2,2"
              />

              {/* Markers */}
              <circle cx="10" cy={preTestY} r="1.5" fill="#3b82f6" />
              <circle cx="150" cy={lrY} r="1.5" fill="#3b82f6" />
              <circle cx="290" cy={postTestY} r="1.5" fill="#10b981" />
            </svg>
          </div>
        </CardContent>
      </Card>

      {/* Result */}
      <Card className="border-2 border-primary">
        <CardHeader>
          <CardTitle>Result</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Pre-Test Probability</p>
              <p className="text-3xl font-bold">{formatProbability(preTestProbability)}</p>
              <p className="text-xs text-muted-foreground mt-1">Odds: {preTestOdds.toFixed(2)}:1</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">× Likelihood Ratio</p>
              <p className="text-3xl font-bold text-primary">{likelihoodRatio.toFixed(2)}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {likelihoodRatio > 1 ? 'Increases' : 'Decreases'} probability
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Post-Test Probability</p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                {formatProbability(postTestProbability)}
              </p>
              <p className="text-xs text-muted-foreground mt-1">Odds: {postTestOdds.toFixed(2)}:1</p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-secondary/50 rounded-md">
            <p className="text-sm font-medium mb-2">Calculation:</p>
            <p className="text-sm font-mono">
              Post-test odds = Pre-test odds × LR
            </p>
            <p className="text-sm font-mono">
              {postTestOdds.toFixed(2)} = {preTestOdds.toFixed(2)} × {likelihoodRatio.toFixed(2)}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Learning Points */}
      <Card>
        <CardHeader>
          <CardTitle>How to Use the Fagan Nomogram</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-3 text-sm">
            <li className="flex items-start">
              <span className="mr-2 font-bold">1.</span>
              <span>
                <strong>Start with pre-test probability:</strong> Estimate based on prevalence, clinical presentation, or risk factors
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 font-bold">2.</span>
              <span>
                <strong>Find the likelihood ratio:</strong> Use LR+ for positive results, LR− for negative results
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 font-bold">3.</span>
              <span>
                <strong>Draw a line:</strong> From pre-test probability through LR to find post-test probability
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 font-bold">4.</span>
              <span>
                <strong>Interpret the result:</strong> Post-test probability guides next steps (treat, observe, test further)
              </span>
            </li>
          </ol>

          <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-md">
            <p className="text-sm font-medium text-blue-600 dark:text-blue-400">💡 Pro Tip</p>
            <p className="text-sm mt-1">
              The nomogram uses a logarithmic scale for LR, which means large LRs have diminishing returns
              on probability change when starting from extreme pre-test probabilities.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
