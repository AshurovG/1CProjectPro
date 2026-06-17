import { View } from "../App";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { SimpleProgress } from "./SimpleProgress";
import { SimpleAvatar, SimpleAvatarFallback } from "./SimpleAvatar";
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Users,
  Plus,
  MoreVertical,
  ArrowRight,
  DollarSign,
} from "lucide-react";

interface ProjectDashboardProps {
  onSelectProject: (projectId: string) => void;
  onNavigate: (view: View) => void;
  onCreateProject: () => void;
}

const projects = [
  {
    id: "project-1",
    name: "Разработка Web платформы",
    description: "Создание новой платформы для управления проектами",
    progress: 68,
    status: "active",
    methodology: "scrum" as const,
    dueDate: "15 декабря 2025",
    teamSize: 8,
    tasksCompleted: 34,
    tasksTotal: 50,
    priority: "high",
  },
  {
    id: "project-2",
    name: "Маркетинговая кампания Q4",
    description: "Запуск осенней маркетинговой кампании",
    progress: 45,
    status: "active",
    methodology: "kanban" as const,
    dueDate: "30 ноября 2025",
    teamSize: 5,
    tasksCompleted: 18,
    tasksTotal: 40,
    priority: "medium",
  },
  {
    id: "project-3",
    name: "Мобильное приложение iOS",
    description: "Разработка нативного приложения для iOS",
    progress: 92,
    status: "review",
    methodology: "waterfall" as const,
    dueDate: "10 ноября 2025",
    teamSize: 6,
    tasksCompleted: 46,
    tasksTotal: 50,
    priority: "high",
  },
];

const stats = [
  {
    title: "Активных задач",
    value: "127",
    change: "+12%",
    icon: Clock,
    color: "text-blue-600",
  },
  {
    title: "Выполнено",
    value: "98",
    change: "+8%",
    icon: CheckCircle2,
    color: "text-green-600",
  },
  {
    title: "Требуют внимания",
    value: "14",
    change: "-3%",
    icon: AlertCircle,
    color: "text-orange-600",
  },
  {
    title: "Эффективность",
    value: "94%",
    change: "+5%",
    icon: TrendingUp,
    color: "text-purple-600",
  },
];

const recentActivity = [
  {
    user: "Ильмира Хайруллова",
    action: "создала новый проект",
    task: "Разработка Web платформы",
    time: "30 минут назад",
    avatar: "ИХ",
  },
  {
    user: "Иван Смирнов",
    action: "завершил задачу",
    task: "Дизайн главной страницы",
    time: "2 часа назад",
    avatar: "ИС",
  },
  {
    user: "Мария Козлова",
    action: "добавила комментарий к",
    task: "API интеграция",
    time: "3 часа назад",
    avatar: "МК",
  },
  {
    user: "Петр Волков",
    action: "переместил задачу",
    task: "Тестирование модуля оплаты",
    time: "4 часа назад",
    avatar: "ПВ",
  },
];

const methodologyLabels = {
  kanban: 'Kanban',
  scrum: 'Scrum',
  waterfall: 'Waterfall',
};

export function ProjectDashboard({ onSelectProject, onNavigate, onCreateProject }: ProjectDashboardProps) {
  return (
    <div className="h-full overflow-auto">
      <div className="p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="mb-2">Обзор проектов</h1>
            <p className="text-muted-foreground">
              Добро пожаловать! У вас {projects.length} активных проекта
            </p>
          </div>
          <Button onClick={onCreateProject}>
            <Plus className="mr-2 h-4 w-4" />
            Создать проект
          </Button>
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="mb-1">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className={stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                    {stat.change}
                  </span>
                  {' '}за последний месяц
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <h2>Мои проекты</h2>
            <Button variant="ghost" onClick={() => onNavigate('kanban')}>
              Все проекты
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Card
                key={project.id}
                className="cursor-pointer transition-shadow hover:shadow-lg"
                onClick={() => {
                  onSelectProject(project.id);
                  onNavigate('kanban');
                }}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="mb-2">{project.name}</CardTitle>
                      <CardDescription>{project.description}</CardDescription>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <Badge variant={project.priority === 'high' ? 'destructive' : 'secondary'}>
                      {project.priority === 'high' ? 'Высокий' : 'Средний'}
                    </Badge>
                    <Badge variant="outline">{project.status === 'active' ? 'В работе' : 'На проверке'}</Badge>
                    <Badge variant="outline">{methodologyLabels[project.methodology]}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="mb-2 flex justify-between text-sm">
                        <span className="text-muted-foreground">Прогресс</span>
                        <span>{project.progress}%</span>
                      </div>
                      <SimpleProgress value={project.progress} />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4" />
                        <span>
                          {project.tasksCompleted} / {project.tasksTotal} задач
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>{project.teamSize}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>До {project.dueDate}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Последняя активность</CardTitle>
              <CardDescription>Обновления по вашим проектам</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex gap-4">
                    <SimpleAvatar className="h-9 w-9">
                      <SimpleAvatarFallback>{activity.avatar}</SimpleAvatarFallback>
                    </SimpleAvatar>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm">
                        <span>{activity.user}</span>
                        <span className="text-muted-foreground"> {activity.action} </span>
                        <span>{activity.task}</span>
                      </p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Быстрые действия</CardTitle>
              <CardDescription>Часто используемые функции</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start" onClick={() => onNavigate('kanban')}>
                <Plus className="mr-2 h-4 w-4" />
                Создать новую задачу
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => onNavigate('financial')}>
                <DollarSign className="mr-2 h-4 w-4" />
                Финансовые отчеты
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => onNavigate('chat')}>
                <Users className="mr-2 h-4 w-4" />
                Пригласить в команду
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => onNavigate('analytics')}>
                <TrendingUp className="mr-2 h-4 w-4" />
                Посмотреть отчеты
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => onNavigate('calendar')}>
                <Clock className="mr-2 h-4 w-4" />
                Планировщик задач
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}