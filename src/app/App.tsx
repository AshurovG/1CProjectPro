import { useState } from "react";
import { SimpleSidebarProvider } from "./components/SimpleSidebar";
import { AppSidebar } from "./components/AppSidebar";
import { ProjectDashboard } from "./components/ProjectDashboard";
import { KanbanBoard } from "./components/KanbanBoard";
import { ScrumBoard } from "./components/ScrumBoard";
import { WaterfallBoard } from "./components/WaterfallBoard";
import { ChatAssistant } from "./components/ChatAssistant";
import { CommunicationCenter } from "./components/CommunicationCenter";
import { Analytics } from "./components/Analytics";
import { Calendar } from "./components/CalendarView";
import { Settings } from "./components/Settings";
import { FinancialReports } from "./components/FinancialReports";
import { Integration1C } from "./components/Integration1C";
import { ExternalIntegrations } from "./components/ExternalIntegrations";
import { CreateProjectDialog, NewProject } from "./components/CreateProjectDialog";
import { ProjectTemplates, ProjectTemplate } from "./components/ProjectTemplates";

export type View = 'dashboard' | 'kanban' | 'scrum' | 'waterfall' | 'chat' | 'communications' | 'analytics' | 'calendar' | 'settings' | 'financial' | 'integration' | 'external-integrations';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [selectedProject, setSelectedProject] = useState<string | null>("project-1");
  const [showCreateProject, setShowCreateProject] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);

  const handleCreateProject = (project: NewProject) => {
    console.log('Creating project:', project);
    setShowCreateProject(false);
    // Navigate to the appropriate board based on methodology
    if (project.methodology === 'kanban') {
      setCurrentView('kanban');
    } else if (project.methodology === 'scrum') {
      setCurrentView('scrum');
    } else if (project.methodology === 'waterfall') {
      setCurrentView('waterfall');
    }
  };

  const handleSelectTemplate = (template: ProjectTemplate) => {
    console.log('Selected template:', template);
    setShowTemplates(false);
    // Navigate to the appropriate board based on methodology
    if (template.methodology === 'kanban') {
      setCurrentView('kanban');
    } else if (template.methodology === 'scrum') {
      setCurrentView('scrum');
    } else if (template.methodology === 'waterfall') {
      setCurrentView('waterfall');
    }
  };

  const handleCreateNewProject = () => {
    setShowTemplates(false);
    setShowCreateProject(true);
  };

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <ProjectDashboard onSelectProject={setSelectedProject} onNavigate={setCurrentView} onCreateProject={() => setShowTemplates(true)} />;
      case 'kanban':
        return <KanbanBoard projectId={selectedProject} />;
      case 'scrum':
        return <ScrumBoard projectId={selectedProject} />;
      case 'waterfall':
        return <WaterfallBoard projectId={selectedProject} />;
      case 'chat':
        return <ChatAssistant />;
      case 'communications':
        return <CommunicationCenter />;
      case 'analytics':
        return <Analytics projectId={selectedProject} currentView={currentView} />;
      case 'calendar':
        return <Calendar />;
      case 'settings':
        return <Settings />;
      case 'financial':
        return <FinancialReports projectId={selectedProject} />;
      case 'integration':
        return <Integration1C />;
      case 'external-integrations':
        return <ExternalIntegrations />;
      default:
        return <ProjectDashboard onSelectProject={setSelectedProject} onNavigate={setCurrentView} onCreateProject={() => setShowTemplates(true)} />;
    }
  };

  return (
    <SimpleSidebarProvider>
      <div className="flex h-screen w-full overflow-hidden bg-neutral-50">
        <AppSidebar currentView={currentView} onNavigate={setCurrentView} onCreateProject={() => setShowTemplates(true)} />
        <main className="flex-1 overflow-auto">
          {renderView()}
        </main>
        {showCreateProject && (
          <CreateProjectDialog
            onClose={() => setShowCreateProject(false)}
            onCreate={handleCreateProject}
          />
        )}
        {showTemplates && (
          <ProjectTemplates
            open={showTemplates}
            onClose={() => setShowTemplates(false)}
            onSelectTemplate={handleSelectTemplate}
            onCreateNew={handleCreateNewProject}
          />
        )}
      </div>
    </SimpleSidebarProvider>
  );
}