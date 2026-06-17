import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { SimpleAvatar, SimpleAvatarFallback } from "./SimpleAvatar";
import { SimpleDropdown } from "./SimpleDropdown";
import { SimpleProgress } from "./SimpleProgress";
import { AddTaskDialog, NewTask } from "./AddTaskDialog";
import { Plus, MoreVertical, Calendar, MessageSquare, Paperclip, Flag, Filter, Play, Pause, CheckCircle2, Settings } from "lucide-react";

interface ScrumBoardProps {
  projectId: string | null;
}

interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  assignees: string[];
  storyPoints: number;
  status: 'backlog' | 'sprint' | 'in-progress' | 'review' | 'done';
  comments: number;
  attachments: number;
  tags: string[];
}

interface Sprint {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'planned' | 'completed';
  goal: string;
  capacity: number;
  committed: number;
}

const currentSprint: Sprint = {
  id: "sprint-1",
  name: "Спринт 1",
  startDate: "28 октября",
  endDate: "10 ноября",
  status: "active",
  goal: "Реализовать базовую авторизацию и главную страницу",
  capacity: 60,
  committed: 45,
};

const sprintBacklog: Task[] = [
  {
    id: "task-1",
    title: "Разработка JWT авторизации",
    description: "Реализовать JWT авторизацию",
    priority: "high",
    assignees: ["ИС", "ЕН"],
    storyPoints: 8,
    status: "in-progress",
    comments: 8,
    attachments: 5,
    tags: ["Backend", "Безопасность"],
  },
  {
    id: "task-2",
    title: "Дизайн главной страницы",
    description: "Создать макеты в Figma",
    priority: "high",
    assignees: ["МК"],
    storyPoints: 5,
    status: "in-progress",
    comments: 12,
    attachments: 3,
    tags: ["Design", "UI"],
  },
  {
    id: "task-3",
    title: "Интеграция платежной системы",
    description: "Подключить ЮKassa",
    priority: "medium",
    assignees: ["ПВ"],
    storyPoints: 13,
    status: "review",
    comments: 5,
    attachments: 1,
    tags: ["Backend", "Платежи"],
  },
];

const productBacklog: Task[] = [
  {
    id: "task-4",
    title: "Настройка уведомлений",
    description: "Email и push уведомления",
    priority: "medium",
    assignees: [],
    storyPoints: 5,
    status: "backlog",
    comments: 2,
    attachments: 0,
    tags: ["Backend", "Notifications"],
  },
  {
    id: "task-5",
    title: "Оптимизация базы данных",
    description: "Добавить индексы",
    priority: "low",
    assignees: [],
    storyPoints: 3,
    status: "backlog",
    comments: 0,
    attachments: 0,
    tags: ["Database", "Performance"],
  },
];

function TaskCard({ task }: { task: Task }) {
  const priorityColors = {
    low: "bg-blue-100 text-blue-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-red-100 text-red-800",
  };

  const priorityLabels = {
    low: "Низкий",
    medium: "Средний",
    high: "Высокий",
  };

  return (
    <Card className="mb-3 cursor-pointer transition-shadow hover:shadow-md">
      <CardContent className="p-4">
        <div className="mb-3 flex items-start justify-between">
          <h3 className="flex-1 text-sm">{task.title}</h3>
          <SimpleDropdown
            trigger={
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <MoreVertical className="h-3 w-3" />
              </Button>
            }
            items={[
              { label: "Редактировать", onClick: () => {} },
              { label: "Переместить", onClick: () => {} },
              { label: "Удалить", onClick: () => {} },
            ]}
          />
        </div>

        <div className="mb-3 flex flex-wrap gap-1">
          {task.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="mb-3 flex items-center gap-2">
          <div className="flex items-center gap-2 rounded bg-primary/10 px-2 py-1 text-xs">
            <span className="font-medium">{task.storyPoints} SP</span>
          </div>
          <Flag className={`h-3 w-3 ${task.priority === 'high' ? 'text-red-600' : task.priority === 'medium' ? 'text-yellow-600' : 'text-blue-600'}`} />
          <span className={`text-xs px-2 py-0.5 rounded ${priorityColors[task.priority]}`}>
            {priorityLabels[task.priority]}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex -space-x-2">
            {task.assignees.length > 0 ? (
              task.assignees.map((assignee, index) => (
                <SimpleAvatar key={index} className="h-6 w-6 border-2 border-background">
                  <SimpleAvatarFallback className="text-xs">{assignee}</SimpleAvatarFallback>
                </SimpleAvatar>
              ))
            ) : (
              <span className="text-xs text-muted-foreground">Не назначено</span>
            )}
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            {task.comments > 0 && (
              <div className="flex items-center gap-1">
                <MessageSquare className="h-3 w-3" />
                <span>{task.comments}</span>
              </div>
            )}
            {task.attachments > 0 && (
              <div className="flex items-center gap-1">
                <Paperclip className="h-3 w-3" />
                <span>{task.attachments}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function ScrumBoard({ projectId }: ScrumBoardProps) {
  const [activeTab, setActiveTab] = useState<'sprint' | 'backlog'>('sprint');
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState<Task[]>(sprintBacklog);
  
  const sprintProgress = Math.round((currentSprint.committed / currentSprint.capacity) * 100);
  const completedPoints = tasks.filter(t => t.status === 'done').reduce((sum, t) => sum + t.storyPoints, 0);
  const totalPoints = tasks.reduce((sum, t) => sum + t.storyPoints, 0);

  const handleAddTask = (newTask: NewTask) => {
    const task: Task = {
      id: `task-${Date.now()}`,
      title: newTask.title,
      description: newTask.description,
      priority: newTask.priority,
      assignees: newTask.assignee ? [newTask.assignee] : [],
      storyPoints: newTask.storyPoints || 3,
      status: 'sprint',
      comments: 0,
      attachments: 0,
      tags: [],
    };
    setTasks([...tasks, task]);
  };

  return (
    <div className="h-full overflow-hidden">
      <div className="border-b bg-background p-4">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h1 className="mb-1">Scrum доска</h1>
            <p className="text-sm text-muted-foreground">Управление спринтами и бэклогом</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Settings className="mr-2 h-4 w-4" />
              Настройки проекта
            </Button>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Фильтры
            </Button>
            <Button onClick={() => setShowAddTask(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Добавить задачу
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                  <Play className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <CardTitle className="text-base">{currentSprint.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {currentSprint.startDate} - {currentSprint.endDate}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Pause className="mr-2 h-4 w-4" />
                  Завершить спринт
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <p className="mb-2 text-sm">
                  <strong>Цель спринта:</strong> {currentSprint.goal}
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <p className="mb-1 text-xs text-muted-foreground">Capacity</p>
                  <p className="text-sm">{currentSprint.capacity} SP</p>
                </div>
                <div>
                  <p className="mb-1 text-xs text-muted-foreground">Committed</p>
                  <p className="text-sm">{currentSprint.committed} SP</p>
                  <SimpleProgress value={sprintProgress} className="mt-1 h-1" />
                </div>
                <div>
                  <p className="mb-1 text-xs text-muted-foreground">Completed</p>
                  <p className="text-sm">{completedPoints} / {totalPoints} SP</p>
                  <SimpleProgress value={(completedPoints / totalPoints) * 100} className="mt-1 h-1" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="p-4">
        <div className="mb-4 flex gap-2">
          <Button
            variant={activeTab === 'sprint' ? 'default' : 'outline'}
            onClick={() => setActiveTab('sprint')}
          >
            Спринт бэклог ({sprintBacklog.length})
          </Button>
          <Button
            variant={activeTab === 'backlog' ? 'default' : 'outline'}
            onClick={() => setActiveTab('backlog')}
          >
            Product бэклог ({productBacklog.length})
          </Button>
        </div>

        {activeTab === 'sprint' ? (
          <div className="grid gap-4 md:grid-cols-4">
            <div>
              <h3 className="mb-3 flex items-center gap-2 text-sm">
                <div className="h-2 w-2 rounded-full bg-gray-500" />
                К выполнению
                <Badge variant="secondary">{tasks.filter(t => t.status === 'sprint').length}</Badge>
              </h3>
              <div className="space-y-3">
                {tasks
                  .filter(t => t.status === 'sprint')
                  .map(task => <TaskCard key={task.id} task={task} />)}
              </div>
            </div>

            <div>
              <h3 className="mb-3 flex items-center gap-2 text-sm">
                <div className="h-2 w-2 rounded-full bg-blue-500" />
                В работе
                <Badge variant="secondary">{tasks.filter(t => t.status === 'in-progress').length}</Badge>
              </h3>
              <div className="space-y-3">
                {tasks
                  .filter(t => t.status === 'in-progress')
                  .map(task => <TaskCard key={task.id} task={task} />)}
              </div>
            </div>

            <div>
              <h3 className="mb-3 flex items-center gap-2 text-sm">
                <div className="h-2 w-2 rounded-full bg-orange-500" />
                На проверке
                <Badge variant="secondary">{tasks.filter(t => t.status === 'review').length}</Badge>
              </h3>
              <div className="space-y-3">
                {tasks
                  .filter(t => t.status === 'review')
                  .map(task => <TaskCard key={task.id} task={task} />)}
              </div>
            </div>

            <div>
              <h3 className="mb-3 flex items-center gap-2 text-sm">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                Выполнено
                <Badge variant="secondary">{tasks.filter(t => t.status === 'done').length}</Badge>
              </h3>
              <div className="space-y-3">
                {tasks
                  .filter(t => t.status === 'done')
                  .map(task => <TaskCard key={task.id} task={task} />)}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="rounded-lg bg-muted/50 p-4">
              <h3 className="mb-2 text-sm">Product Backlog</h3>
              <p className="text-sm text-muted-foreground">
                Приоритизированный список всех функций и задач проекта. Перетащите элементы в спринт для планирования.
              </p>
            </div>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {productBacklog.map(task => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </div>
        )}
      </div>

      {showAddTask && (
        <AddTaskDialog
          boardType="scrum"
          onClose={() => setShowAddTask(false)}
          onAdd={handleAddTask}
        />
      )}
    </div>
  );
}