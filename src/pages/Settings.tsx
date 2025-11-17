import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAppStore } from '@/stores/appStore';
import { Moon, Sun, Download, Trash2, Info } from 'lucide-react';

export default function Settings() {
  const darkMode = useAppStore((state) => state.darkMode);
  const toggleDarkMode = useAppStore((state) => state.toggleDarkMode);
  const completedModules = useAppStore((state) => state.completedModules);
  const assessmentScores = useAppStore((state) => state.assessmentScores);

  const clearProgress = () => {
    if (confirm('Are you sure you want to clear all progress? This cannot be undone.')) {
      localStorage.removeItem('lab-intelligence-storage');
      window.location.reload();
    }
  };

  const exportData = () => {
    const data = {
      completedModules,
      assessmentScores,
      exportDate: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `lab-intelligence-progress-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-2">
          Customize your learning experience
        </p>
      </div>

      {/* Appearance */}
      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>Customize the visual theme</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {darkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              <div>
                <p className="font-medium">Dark Mode</p>
                <p className="text-sm text-muted-foreground">
                  {darkMode ? 'Currently enabled' : 'Currently disabled'}
                </p>
              </div>
            </div>
            <Button onClick={toggleDarkMode} variant="outline">
              {darkMode ? 'Disable' : 'Enable'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Learning Progress</CardTitle>
          <CardDescription>Your achievements and completion status</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-secondary/50 rounded-md">
              <p className="text-sm text-muted-foreground mb-1">Completed Modules</p>
              <p className="text-3xl font-bold">{completedModules.length}</p>
            </div>
            <div className="p-4 bg-secondary/50 rounded-md">
              <p className="text-sm text-muted-foreground mb-1">Assessments Taken</p>
              <p className="text-3xl font-bold">{Object.keys(assessmentScores).length}</p>
            </div>
          </div>

          {Object.keys(assessmentScores).length > 0 && (
            <div>
              <p className="font-medium mb-2">Assessment Scores:</p>
              <div className="space-y-2">
                {Object.entries(assessmentScores).map(([id, score]) => (
                  <div key={id} className="flex items-center justify-between p-2 bg-secondary/30 rounded">
                    <span className="text-sm">{id}</span>
                    <Badge variant={score >= 80 ? 'default' : score >= 70 ? 'secondary' : 'outline'}>
                      {score}%
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card>
        <CardHeader>
          <CardTitle>Data Management</CardTitle>
          <CardDescription>Export or reset your learning data</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-md">
            <div className="flex items-center space-x-3">
              <Download className="h-5 w-5" />
              <div>
                <p className="font-medium">Export Progress</p>
                <p className="text-sm text-muted-foreground">
                  Download your learning data as JSON
                </p>
              </div>
            </div>
            <Button onClick={exportData} variant="outline">
              Export
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 bg-destructive/10 border border-destructive/20 rounded-md">
            <div className="flex items-center space-x-3">
              <Trash2 className="h-5 w-5 text-destructive" />
              <div>
                <p className="font-medium text-destructive">Clear All Progress</p>
                <p className="text-sm text-muted-foreground">
                  Reset all modules and assessments
                </p>
              </div>
            </div>
            <Button onClick={clearProgress} variant="destructive">
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Offline Support */}
      <Card>
        <CardHeader>
          <CardTitle>Offline Access</CardTitle>
          <CardDescription>Use the app without an internet connection</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-md">
            <div className="flex items-start space-x-3">
              <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
              <div>
                <p className="font-medium text-blue-600 dark:text-blue-400 mb-1">
                  Progressive Web App
                </p>
                <p className="text-sm">
                  This app is a Progressive Web App (PWA) with offline capabilities.
                  Once loaded, you can use most features without an internet connection.
                  Your progress is stored locally on your device.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* About */}
      <Card>
        <CardHeader>
          <CardTitle>About Lab Intelligence</CardTitle>
          <CardDescription>Educational platform information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <p>
            <strong>Version:</strong> 1.0.0
          </p>
          <p>
            <strong>Purpose:</strong> Educational platform for diagnostic reasoning and laboratory stewardship
          </p>
          <p>
            <strong>Target Audience:</strong> Medical students, residents, fellows, and attending physicians
          </p>
          <div className="pt-3 border-t">
            <p className="text-muted-foreground">
              This platform uses synthetic data and evidence-based diagnostic principles for educational
              purposes only. All test characteristics are derived from published literature but should not
              be used for actual clinical decision-making. Always consult current clinical guidelines and
              institutional protocols for patient care.
            </p>
          </div>
          <div className="pt-3 border-t">
            <p className="text-xs text-muted-foreground">
              Built with React, TypeScript, Tailwind CSS, and Recharts.
              Designed to be mobile-first, offline-capable, and accessible.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
