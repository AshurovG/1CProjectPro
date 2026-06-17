import { View } from "../App";
import {
  SimpleSidebar,
  SimpleSidebarContent,
  SimpleSidebarGroup,
  SimpleSidebarGroupContent,
  SimpleSidebarGroupLabel,
  SimpleSidebarMenu,
  SimpleSidebarMenuButton,
  SimpleSidebarMenuItem,
  SimpleSidebarHeader,
  SimpleSidebarFooter,
} from "./SimpleSidebar";
import {
  LayoutDashboard,
  KanbanSquare,
  MessageSquare,
  Radio,
  BarChart3,
  Calendar,
  Settings,
  Users,
  FolderKanban,
  Plus,
  Wallet,
  Database,
  Network,
} from "lucide-react";
import { SimpleAvatar, SimpleAvatarFallback } from "./SimpleAvatar";
import Logo from "../../imports/Логотип";

interface AppSidebarProps {
  currentView: View;
  onNavigate: (view: View) => void;
  onCreateProject: () => void;
}

const mainNavItems = [
  { id: 'dashboard' as View, icon: LayoutDashboard, label: 'Обзор' },
  { id: 'calendar' as View, icon: Calendar, label: 'Календарь' },
  { id: 'analytics' as View, icon: BarChart3, label: 'Аналитика' },
  { id: 'financial' as View, icon: Wallet, label: 'Финансы' },
];

const communicationItems = [
  { id: 'chat' as View, icon: MessageSquare, label: 'AI Помощник' },
  { id: 'communications' as View, icon: Radio, label: 'Коммуникации' },
];

const integrationItems = [
  { id: 'integration' as View, icon: Database, label: 'Интеграция 1С' },
  { id: 'external-integrations' as View, icon: Network, label: 'Внешние интеграции' },
];

export function AppSidebar({ currentView, onNavigate, onCreateProject }: AppSidebarProps) {
  return (
    <SimpleSidebar>
      <SimpleSidebarHeader className="border-b px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-6 flex-shrink-0">
            <Logo />
          </div>
          <h2 className="text-sm">ПроектПро</h2>
        </div>
      </SimpleSidebarHeader>
      
      <SimpleSidebarContent>
        <SimpleSidebarGroup>
          <SimpleSidebarGroupLabel>Рабочее пространство</SimpleSidebarGroupLabel>
          <SimpleSidebarGroupContent>
            <SimpleSidebarMenu>
              {mainNavItems.map((item) => (
                <SimpleSidebarMenuItem key={item.id}>
                  <SimpleSidebarMenuButton
                    onClick={() => onNavigate(item.id)}
                    isActive={currentView === item.id}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </SimpleSidebarMenuButton>
                </SimpleSidebarMenuItem>
              ))}
            </SimpleSidebarMenu>
          </SimpleSidebarGroupContent>
        </SimpleSidebarGroup>

        <SimpleSidebarGroup>
          <SimpleSidebarGroupLabel>Коммуникации</SimpleSidebarGroupLabel>
          <SimpleSidebarGroupContent>
            <SimpleSidebarMenu>
              {communicationItems.map((item) => (
                <SimpleSidebarMenuItem key={item.id}>
                  <SimpleSidebarMenuButton
                    onClick={() => onNavigate(item.id)}
                    isActive={currentView === item.id}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </SimpleSidebarMenuButton>
                </SimpleSidebarMenuItem>
              ))}
            </SimpleSidebarMenu>
          </SimpleSidebarGroupContent>
        </SimpleSidebarGroup>

        <SimpleSidebarGroup>
          <SimpleSidebarGroupLabel>
            <div className="flex items-center justify-between w-full">
              <span>Проекты</span>
              <button
                onClick={onCreateProject}
                className="h-5 w-5 rounded hover:bg-accent flex items-center justify-center"
                title="Создать проект из шаблона"
              >
                <Plus className="h-3 w-3" />
              </button>
            </div>
          </SimpleSidebarGroupLabel>
          <SimpleSidebarGroupContent>
            <SimpleSidebarMenu>
              <SimpleSidebarMenuItem>
                <div className="flex items-center w-full group">
                  <SimpleSidebarMenuButton onClick={() => onNavigate('scrum')} className="flex-1">
                    <FolderKanban className="h-4 w-4" />
                    <span>Разработка веб-платформы</span>
                  </SimpleSidebarMenuButton>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log('Настройки проекта: Разработка веб-платформы');
                    }}
                    className="h-8 w-8 rounded hover:bg-accent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Настройки проекта"
                  >
                    <Settings className="h-3.5 w-3.5" />
                  </button>
                </div>
              </SimpleSidebarMenuItem>
              <SimpleSidebarMenuItem>
                <div className="flex items-center w-full group">
                  <SimpleSidebarMenuButton onClick={() => onNavigate('kanban')} className="flex-1">
                    <FolderKanban className="h-4 w-4" />
                    <span>Маркетинговая кампания</span>
                  </SimpleSidebarMenuButton>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log('Настройки проекта: Маркетинговая кампания');
                    }}
                    className="h-8 w-8 rounded hover:bg-accent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Настройки проекта"
                  >
                    <Settings className="h-3.5 w-3.5" />
                  </button>
                </div>
              </SimpleSidebarMenuItem>
              <SimpleSidebarMenuItem>
                <div className="flex items-center w-full group">
                  <SimpleSidebarMenuButton onClick={() => onNavigate('waterfall')} className="flex-1">
                    <FolderKanban className="h-4 w-4" />
                    <span>Корпоративная система</span>
                  </SimpleSidebarMenuButton>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log('Настройки проекта: Корпоративная система');
                    }}
                    className="h-8 w-8 rounded hover:bg-accent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Настройки проекта"
                  >
                    <Settings className="h-3.5 w-3.5" />
                  </button>
                </div>
              </SimpleSidebarMenuItem>
            </SimpleSidebarMenu>
          </SimpleSidebarGroupContent>
        </SimpleSidebarGroup>

        <SimpleSidebarGroup>
          <SimpleSidebarGroupLabel>Интеграция</SimpleSidebarGroupLabel>
          <SimpleSidebarGroupContent>
            <SimpleSidebarMenu>
              {integrationItems.map((item) => (
                <SimpleSidebarMenuItem key={item.id}>
                  <SimpleSidebarMenuButton
                    onClick={() => onNavigate(item.id)}
                    isActive={currentView === item.id}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </SimpleSidebarMenuButton>
                </SimpleSidebarMenuItem>
              ))}
            </SimpleSidebarMenu>
          </SimpleSidebarGroupContent>
        </SimpleSidebarGroup>
      </SimpleSidebarContent>

      <SimpleSidebarFooter className="border-t p-4">
        <SimpleSidebarMenu>
          <SimpleSidebarMenuItem>
            <SimpleSidebarMenuButton
              onClick={() => onNavigate('settings')}
              isActive={currentView === 'settings'}
            >
              <Settings className="h-4 w-4" />
              <span>Настройки</span>
            </SimpleSidebarMenuButton>
          </SimpleSidebarMenuItem>
        </SimpleSidebarMenu>
        <div className="mt-4 flex items-center gap-3 rounded-lg bg-muted p-3">
          <SimpleAvatar className="h-8 w-8">
            <SimpleAvatarFallback>ИХ</SimpleAvatarFallback>
          </SimpleAvatar>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm truncate">Ильмира Хайруллова</p>
            <p className="text-xs text-muted-foreground truncate">Менеджер проекта</p>
          </div>
        </div>
      </SimpleSidebarFooter>
    </SimpleSidebar>
  );
}