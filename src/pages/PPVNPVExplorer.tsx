import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Select } from '@/components/ui/select';
import { diagnosticTests } from '@/data/tests';
import { calculatePPV, calculateNPV, formatProbability } from '@/utils/bayesian';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';

export default function PPVNPVExplorer() {
  const [selectedTest, setSelectedTest] = useState(diagnosticTests[0].id);
  const [prevalence, setPrevalence] = useState(0.15);

  const test = diagnosticTests.find(t => t.id === selectedTest) || diagnosticTests[0];
  const ppv = calculatePPV(test.sensitivity, test.specificity, prevalence);
  const npv = calculateNPV(test.sensitivity, test.specificity, prevalence);

  // Generate data for visualization
  const chartData = [];
  for (let i = 1; i <= 99; i += 2) {
    const prev = i / 100;
    const ppvVal = calculatePPV(test.sensitivity, test.specificity, prev);
    const npvVal = calculateNPV(test.sensitivity, test.specificity, prev);
    chartData.push({
      prevalence: i,
      PPV: ppvVal * 100,
      NPV: npvVal * 100
    });
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">PPV/NPV vs Prevalence Explorer</h1>
        <p className="text-muted-foreground mt-2">
          Understand how predictive values change with disease prevalence
        </p>
      </div>

      {/* Controls */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Select Test</CardTitle>
            <CardDescription>Choose a diagnostic test</CardDescription>
          </CardHeader>
          <CardContent>
            <Select value={selectedTest} onChange={(e) => setSelectedTest(e.target.value)}>
              {diagnosticTests.map((test) => (
                <option key={test.id} value={test.id}>
                  {test.name}
                </option>
              ))}
            </Select>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">Sensitivity</p>
                <p className="text-lg font-bold">{formatProbability(test.sensitivity)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Specificity</p>
                <p className="text-lg font-bold">{formatProbability(test.specificity)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Disease Prevalence</CardTitle>
            <CardDescription>Adjust population disease prevalence</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-primary">
                {formatProbability(prevalence)}
              </span>
            </div>
            <Slider
              value={prevalence * 100}
              onChange={(value) => setPrevalence(value / 100)}
              min={1}
              max={99}
              step={1}
            />
            <p className="text-sm text-muted-foreground">
              Prevalence = Pre-test probability in unselected population
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Results */}
      <Card className="border-2 border-primary">
        <CardHeader>
          <CardTitle>Predictive Values at Current Prevalence</CardTitle>
          <CardDescription>
            Performance of {test.name} at {formatProbability(prevalence)} prevalence
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center p-6 bg-green-500/10 border border-green-500/20 rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Positive Predictive Value (PPV)</p>
              <p className="text-5xl font-bold text-green-600 dark:text-green-400 mb-2">
                {formatProbability(ppv)}
              </p>
              <p className="text-sm">
                If test is <strong>positive</strong>, probability of disease = {formatProbability(ppv)}
              </p>
            </div>

            <div className="text-center p-6 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Negative Predictive Value (NPV)</p>
              <p className="text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {formatProbability(npv)}
              </p>
              <p className="text-sm">
                If test is <strong>negative</strong>, probability of no disease = {formatProbability(npv)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 2x2 Table */}
      <Card>
        <CardHeader>
          <CardTitle>2×2 Contingency Table</CardTitle>
          <CardDescription>Based on 1000 patients at {formatProbability(prevalence)} prevalence</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-3"></th>
                  <th className="p-3 text-center font-medium">Disease Present</th>
                  <th className="p-3 text-center font-medium">Disease Absent</th>
                  <th className="p-3 text-center font-medium">Total</th>
                </tr>
              </thead>
              <tbody>
                {(() => {
                  const total = 1000;
                  const diseased = Math.round(total * prevalence);
                  const healthy = total - diseased;
                  const truePos = Math.round(diseased * test.sensitivity);
                  const falseNeg = diseased - truePos;
                  const trueNeg = Math.round(healthy * test.specificity);
                  const falsePos = healthy - trueNeg;
                  const totalPos = truePos + falsePos;
                  const totalNeg = falseNeg + trueNeg;

                  return (
                    <>
                      <tr className="border-b">
                        <td className="p-3 font-medium">Test Positive</td>
                        <td className="p-3 text-center bg-green-500/10">
                          <div className="font-bold text-green-600 dark:text-green-400">{truePos}</div>
                          <div className="text-xs text-muted-foreground">True Positives</div>
                        </td>
                        <td className="p-3 text-center bg-orange-500/10">
                          <div className="font-bold text-orange-600 dark:text-orange-400">{falsePos}</div>
                          <div className="text-xs text-muted-foreground">False Positives</div>
                        </td>
                        <td className="p-3 text-center font-bold">{totalPos}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-3 font-medium">Test Negative</td>
                        <td className="p-3 text-center bg-orange-500/10">
                          <div className="font-bold text-orange-600 dark:text-orange-400">{falseNeg}</div>
                          <div className="text-xs text-muted-foreground">False Negatives</div>
                        </td>
                        <td className="p-3 text-center bg-blue-500/10">
                          <div className="font-bold text-blue-600 dark:text-blue-400">{trueNeg}</div>
                          <div className="text-xs text-muted-foreground">True Negatives</div>
                        </td>
                        <td className="p-3 text-center font-bold">{totalNeg}</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium">Total</td>
                        <td className="p-3 text-center font-bold">{diseased}</td>
                        <td className="p-3 text-center font-bold">{healthy}</td>
                        <td className="p-3 text-center font-bold">{total}</td>
                      </tr>
                    </>
                  );
                })()}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Visualization */}
      <Card>
        <CardHeader>
          <CardTitle>PPV and NPV Across Prevalence Range</CardTitle>
          <CardDescription>
            How predictive values change with disease prevalence
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="prevalence"
                  label={{ value: 'Disease Prevalence (%)', position: 'insideBottom', offset: -5 }}
                />
                <YAxis
                  label={{ value: 'Predictive Value (%)', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="PPV"
                  stroke="#22c55e"
                  strokeWidth={2}
                  dot={false}
                  name="Positive Predictive Value"
                />
                <Line
                  type="monotone"
                  dataKey="NPV"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={false}
                  name="Negative Predictive Value"
                />
                <ReferenceLine
                  x={prevalence * 100}
                  stroke="#ef4444"
                  strokeDasharray="3 3"
                  label="Current"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Learning Points */}
      <Card>
        <CardHeader>
          <CardTitle>Key Concepts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">PPV and NPV vs Sensitivity and Specificity</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• <strong>Sensitivity & Specificity:</strong> Properties of the test (constant across populations)</li>
                <li>• <strong>PPV & NPV:</strong> Clinical utility (vary with prevalence/pre-test probability)</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-2">Prevalence Effects</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Higher prevalence → Higher PPV, Lower NPV</li>
                <li>• Lower prevalence → Lower PPV, Higher NPV</li>
                <li>• Even excellent tests have poor PPV at very low prevalence</li>
              </ul>
            </div>

            <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-md">
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400">💡 Clinical Pearl</p>
              <p className="text-sm mt-1">
                This is why screening tests in low-risk populations often yield many false positives,
                even when the test has good sensitivity and specificity. Always consider pre-test probability!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
