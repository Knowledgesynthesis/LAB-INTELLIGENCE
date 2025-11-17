import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, AlertCircle } from 'lucide-react';

interface CascadeStep {
  test: string;
  reason: string;
  cost: number;
  harm: 'none' | 'minimal' | 'moderate' | 'significant';
}

export default function TestCascade() {
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [cascade, setCascade] = useState<CascadeStep[]>([]);

  const scenarios = [
    {
      id: 'incidentaloma',
      title: 'Adrenal Incidentaloma',
      description: 'CT scan for abdominal pain reveals 2cm adrenal nodule',
      initialTest: 'Abdominal CT',
      trigger: 'Incidental finding',
      potentialCascade: [
        { test: 'Dedicated Adrenal CT', reason: 'Further characterization', cost: 800, harm: 'minimal' as const },
        { test: 'Metanephrines', reason: 'Rule out pheochromocytoma', cost: 150, harm: 'none' as const },
        { test: 'Dexamethasone suppression', reason: 'Rule out Cushing', cost: 200, harm: 'minimal' as const },
        { test: 'Adrenal MRI', reason: 'Indeterminate CT findings', cost: 1200, harm: 'minimal' as const },
        { test: 'Adrenal biopsy', reason: 'Persistent concern', cost: 3000, harm: 'significant' as const },
      ],
      stewardshipAlternative: 'If nodule <4cm, homogeneous, and low attenuation (lipid-rich), repeat imaging in 6-12 months per ACR guidelines'
    },
    {
      id: 'thyroid',
      title: 'Thyroid Nodule',
      description: 'Neck CT for lymphadenopathy shows 1.5cm thyroid nodule',
      initialTest: 'Neck CT',
      trigger: 'Incidental thyroid nodule',
      potentialCascade: [
        { test: 'Thyroid ultrasound', reason: 'Characterize nodule', cost: 400, harm: 'none' as const },
        { test: 'TSH', reason: 'Assess function', cost: 50, harm: 'none' as const },
        { test: 'Fine needle aspiration', reason: 'Suspicious features', cost: 800, harm: 'moderate' as const },
        { test: 'Thyroid scan', reason: 'Determine if nodule is hot/cold', cost: 500, harm: 'minimal' as const },
        { test: 'Thyroidectomy', reason: 'Indeterminate cytology', cost: 15000, harm: 'significant' as const },
      ],
      stewardshipAlternative: 'If nodule <1cm and no high-risk features, observation may be appropriate per ATA guidelines'
    },
    {
      id: 'anemia-workup',
      title: 'Anemia Over-investigation',
      description: 'Mild anemia (Hgb 11.5) in asymptomatic elderly patient',
      initialTest: 'CBC',
      trigger: 'Mild anemia',
      potentialCascade: [
        { test: 'Iron studies', reason: 'Rule out iron deficiency', cost: 75, harm: 'none' as const },
        { test: 'B12 and folate', reason: 'Check for deficiency', cost: 100, harm: 'none' as const },
        { test: 'Reticulocyte count', reason: 'Assess production', cost: 50, harm: 'none' as const },
        { test: 'Peripheral smear', reason: 'Morphology', cost: 80, harm: 'none' as const },
        { test: 'Hemolysis labs', reason: 'Rule out hemolysis', cost: 200, harm: 'none' as const },
        { test: 'Hematology referral', reason: 'Unexplained anemia', cost: 500, harm: 'minimal' as const },
        { test: 'Bone marrow biopsy', reason: 'Persistent concern', cost: 2500, harm: 'significant' as const },
      ],
      stewardshipAlternative: 'In stable, asymptomatic patient with Hgb >11 and normal MCV, repeat CBC in 3 months may be reasonable'
    }
  ];

  const scenario = scenarios.find(s => s.id === selectedScenario);

  const startCascade = () => {
    if (scenario) {
      setCascade([scenario.potentialCascade[0]]);
    }
  };

  const addNextTest = () => {
    if (scenario && cascade.length < scenario.potentialCascade.length) {
      setCascade([...cascade, scenario.potentialCascade[cascade.length]]);
    }
  };

  const resetCascade = () => {
    setCascade([]);
    setSelectedScenario(null);
  };

  const totalCost = cascade.reduce((sum, step) => sum + step.cost, 0);
  const maxHarm = cascade.reduce((max, step) => {
    const harmLevels = { none: 0, minimal: 1, moderate: 2, significant: 3 };
    const currentLevel = harmLevels[step.harm];
    return currentLevel > max ? currentLevel : max;
  }, 0);

  const harmLabels = ['none', 'minimal', 'moderate', 'significant'];
  const overallHarm = harmLabels[maxHarm];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Test Cascade Simulator</h1>
        <p className="text-muted-foreground mt-2">
          Visualize how one test can lead to a cascade of additional testing
        </p>
      </div>

      {/* Scenario Selection */}
      {!selectedScenario && (
        <div className="grid md:grid-cols-3 gap-6">
          {scenarios.map((s) => (
            <Card
              key={s.id}
              className="cursor-pointer hover:border-primary transition-colors"
              onClick={() => setSelectedScenario(s.id)}
            >
              <CardHeader>
                <CardTitle className="text-lg">{s.title}</CardTitle>
                <CardDescription>{s.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm"><strong>Initial Test:</strong> {s.initialTest}</p>
                  <p className="text-sm"><strong>Trigger:</strong> {s.trigger}</p>
                  <Button className="w-full mt-4">
                    Explore Cascade
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Active Scenario */}
      {scenario && (
        <>
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{scenario.title}</CardTitle>
                  <CardDescription className="mt-2">{scenario.description}</CardDescription>
                </div>
                <Button variant="outline" onClick={resetCascade}>
                  Reset
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-secondary/50 rounded-md">
                <p className="text-sm"><strong>Initial Test:</strong> {scenario.initialTest}</p>
                <p className="text-sm mt-1"><strong>Trigger:</strong> {scenario.trigger}</p>
              </div>
            </CardContent>
          </Card>

          {/* Cascade Visualization */}
          {cascade.length === 0 ? (
            <Card className="border-2 border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <AlertTriangle className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium mb-2">Start the Cascade</p>
                <p className="text-sm text-muted-foreground mb-4 text-center max-w-md">
                  Click below to see what happens when this incidental finding triggers additional testing
                </p>
                <Button onClick={startCascade}>
                  Order First Test
                </Button>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Cascade Steps */}
              <div className="space-y-4">
                {cascade.map((step, index) => (
                  <Card key={index} className="border-l-4 border-l-orange-500">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge>Test #{index + 1}</Badge>
                            <Badge variant={
                              step.harm === 'none' ? 'secondary' :
                              step.harm === 'minimal' ? 'outline' :
                              step.harm === 'moderate' ? 'secondary' :
                              'destructive'
                            }>
                              {step.harm} harm
                            </Badge>
                          </div>
                          <CardTitle className="text-lg">{step.test}</CardTitle>
                          <CardDescription className="mt-1">{step.reason}</CardDescription>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                            ${step.cost}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>

              {/* Cascade Metrics */}
              <Card className="bg-orange-500/10 border-orange-500/50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertCircle className="h-5 w-5" />
                    <span>Cascade Impact</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-1">Tests Ordered</p>
                      <p className="text-3xl font-bold">{cascade.length}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-1">Total Cost</p>
                      <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                        ${totalCost.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-1">Overall Harm</p>
                      <p className="text-3xl font-bold capitalize">{overallHarm}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Continue Cascade */}
              {cascade.length < scenario.potentialCascade.length && (
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-muted-foreground">
                        Next test: {scenario.potentialCascade[cascade.length].test}
                      </p>
                      <Button onClick={addNextTest} variant="outline">
                        Order Next Test
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Stewardship Alternative */}
              <Card className="border-2 border-green-500/50 bg-green-500/5">
                <CardHeader>
                  <CardTitle className="text-green-600 dark:text-green-400">
                    Stewardship Alternative
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{scenario.stewardshipAlternative}</p>
                  <div className="mt-4 p-3 bg-background/50 rounded-md">
                    <p className="text-sm font-medium mb-2">Cost Comparison:</p>
                    <p className="text-sm">
                      Cascade cost: <span className="font-bold text-orange-600">${totalCost.toLocaleString()}</span>
                      {' vs '}
                      Observation: <span className="font-bold text-green-600">$0</span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {/* Learning Points */}
          <Card>
            <CardHeader>
              <CardTitle>Understanding Test Cascades</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Incidental findings often trigger additional testing, even when clinical significance is low</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Each subsequent test can lead to more tests, creating a "cascade"</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Cascades increase costs, patient anxiety, and potential for harm</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Many cascades ultimately reveal benign findings that could have been managed conservatively</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Evidence-based guidelines help identify when watchful waiting is appropriate</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
