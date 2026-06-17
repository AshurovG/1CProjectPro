import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { SimpleProgress } from "./SimpleProgress";
import { SimpleAvatar, SimpleAvatarFallback } from "./SimpleAvatar";
import { AddTaskDialog, NewTask } from "./AddTaskDialog";
import { Plus, CheckCircle2, AlertCircle, Clock, FileText, Settings, Filter } from "lucide-react";

interface WaterfallBoardProps {
  projectId: string | null;
}

interface WaterfallTask {
  id: string;
  title: string;
  description: string;
  phase: string;
  priority: 'low' | 'medium' | 'high';
  assignee?: string;
  estimatedDays: number;
  actualDays: number;
  status: 'pending' | 'in-progress' | 'completed';
}

interface Phase {
  id: string;
  name: string;
  description: string;
  status: 'completed' | 'in-progress' | 'pending' | 'blocked';
  progress: number;
  startDate: string;
  endDate: string;
  deliverables: string[];
  team: string[];
}

const phases: Phase[] = [
  {
    id: "phase-1",
    name: "Анализ требований",
    description: "Сбор и документирование требований к системе",
    status: "completed",
    progress: 100,
    startDate: "1 октября",
    endDate: "15 октября",
    deliverables: ["Техническое задание", "Анализ рынка", "User stories"],
    team: ["ИХ", "МК"],
  },
  {
    id: "phase-2",
    name: "Проектирование",
    description: "Разработка архитектуры и дизайна системы",
    status: "completed",
    progress: 100,
    startDate: "16 октября",
    endDate: "31 октября",
    deliverables: ["Архитектура системы", "Дизайн-макеты", "Схема БД"],
    team: ["ИС", "МК", "ПВ"],
  },
  {
    id: "phase-3",
    name: "Разработка",
    description: "Реализация функциональности системы",
    status: "in-progress",
    progress: 65,
    startDate: "1 ноября",
    endDate: "30 ноября",
    deliverables: ["Рабочий код", "Unit тесты", "Документация API"],
    team: ["ИС", "ПВ", "ЕН"],
  },
  {
    id: "phase-4",
    name: "Тестирование",
    description: "Проверка качества и устранение дефектов",
    status: "pending",
    progress: 0,
    startDate: "1 декабря",
    endDate: "15 декабря",
    deliverables: ["Тест-кейсы", "Отчет о багах", "План тестирования"],
    team: ["ЕН"],
  },
  {
    id: "phase-5",
    name: "Внедрение",
    description: "Развертывание системы в продуктивной среде",
    status: "pending",
    progress: 0,
    startDate: "16 декабря",
    endDate: "25 декабря",
    deliverables: ["Развернутая система", "Руководство пользователя", "План поддержки"],
    team: ["ИС", "ПВ"],
  },
];

const statusConfig = {
  completed: { label: "Завершено", color: "text-green-600", bgColor: "bg-green-100", icon: CheckCircle2 },
  'in-progress': { label: "В процессе", color: "text-blue-600", bgColor: "bg-blue-100", icon: Clock },
  pending: { label: "Ожидание", color: "text-gray-600", bgColor: "bg-gray-100", icon: Clock },
  blocked: { label: "Заблокировано", color: "text-red-600", bgColor: "bg-red-100", icon: AlertCircle },
};

export function WaterfallBoard({ projectId }: WaterfallBoardProps) {
  const [showAddTask, setShowAddTask] = useState(false);
  const [phaseTasks, setPhaseTasks] = useState<WaterfallTask[]>([]);
  
  const overallProgress = Math.round(
    phases.reduce((sum, phase) => sum + phase.progress, 0) / phases.length
  );

  const handleAddTask = (newTask: NewTask) => {
    const task: WaterfallTask = {
      id: `task-${Date.now()}`,
      title: newTask.title,
      description: newTask.description,
      phase: newTask.phase || 'development',
      priority: newTask.priority,
      assignee: newTask.assignee,
      estimatedDays: newTask.estimatedDays || 5,
      actualDays: 0,
      status: 'pending',
    };
    setPhaseTasks([...phaseTasks, task]);
  };

  return (
    <div className="h-full overflow-auto">
      <div className="p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="mb-2">Waterfall проект</h1>
            <p className="text-muted-foreground">
              Последовательное выполнение фаз проекта
            </p>
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
            <Button variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              Документация
            </Button>
            <Button onClick={() => setShowAddTask(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Добавить задачу
            </Button>
          </div>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Общий прогресс проекта</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm">Выполнено фаз</span>
                  <span className="text-sm">{overallProgress}%</span>
                </div>
                <SimpleProgress value={overallProgress} className="h-3" />
              </div>
              <div className="grid gap-4 md:grid-cols-4">
                <div className="rounded-lg border p-3">
                  <p className="mb-1 text-xs text-muted-foreground">Завершено</p>
                  <p className="text-xl">{phases.filter(p => p.status === 'completed').length}</p>
                </div>
                <div className="rounded-lg border p-3">
                  <p className="mb-1 text-xs text-muted-foreground">В процессе</p>
                  <p className="text-xl">{phases.filter(p => p.status === 'in-progress').length}</p>
                </div>
                <div className="rounded-lg border p-3">
                  <p className="mb-1 text-xs text-muted-foreground">Ожидание</p>
                  <p className="text-xl">{phases.filter(p => p.status === 'pending').length}</p>
                </div>
                <div className="rounded-lg border p-3">
                  <p className="mb-1 text-xs text-muted-foreground">Всего фаз</p>
                  <p className="text-xl">{phases.length}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {phases.map((phase, index) => {
            const config = statusConfig[phase.status];
            const Icon = config.icon;
            
            return (
              <Card key={phase.id} className={phase.status === 'in-progress' ? 'border-2 border-primary' : ''}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="mb-2 flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm">
                          {index + 1}
                        </div>
                        <div>
                          <CardTitle className="text-base">{phase.name}</CardTitle>
                          <p className="text-sm text-muted-foreground">{phase.description}</p>
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline" className={`${config.bgColor} ${config.color} border-0`}>
                      <Icon className="mr-1 h-3 w-3" />
                      {config.label}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Прогресс</span>
                        <span>{phase.progress}%</span>
                      </div>
                      <SimpleProgress value={phase.progress} className="h-2" />
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                      <div>
                        <p className="mb-2 text-xs text-muted-foreground">Сроки</p>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{phase.startDate} - {phase.endDate}</span>
                        </div>
                      </div>

                      <div>
                        <p className="mb-2 text-xs text-muted-foreground">Команда</p>
                        <div className="flex -space-x-2">
                          {phase.team.map((member, idx) => (
                            <SimpleAvatar key={idx} className="h-6 w-6 border-2 border-background">
                              <SimpleAvatarFallback className="text-xs">{member}</SimpleAvatarFallback>
                            </SimpleAvatar>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="mb-2 text-xs text-muted-foreground">Результаты</p>
                        <p className="text-sm">{phase.deliverables.length} документов</p>
                      </div>
                    </div>

                    <div>
                      <p className="mb-2 text-xs text-muted-foreground">Ключевые результаты:</p>
                      <div className="flex flex-wrap gap-2">
                        {phase.deliverables.map((deliverable, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            <FileText className="mr-1 h-3 w-3" />
                            {deliverable}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {phase.status === 'pending' && index > 0 && (
                      <div className="rounded-lg bg-muted/50 p-3 text-sm text-muted-foreground">
                        ⚠️ Начнется после завершения предыдущей фазы
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {phaseTasks.length > 0 && (
          <div className="mt-8">
            <h2 className="mb-4">Дополнительные задачи</h2>
            <div className="space-y-3">
              {phaseTasks.map((task) => (
                <Card key={task.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="text-sm">{task.title}</h4>
                        <p className="mt-1 text-xs text-muted-foreground">{task.description}</p>
                        <div className="mt-2 flex gap-2">
                          <Badge variant="outline" className="text-xs">
                            {waterfallPhases.find(p => p.value === task.phase)?.label}
                          </Badge>
                          <Badge 
                            variant="secondary"
                            className={`text-xs ${
                              task.priority === 'high' ? 'bg-red-100 text-red-800' :
                              task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-blue-100 text-blue-800'
                            }`}
                          >
                            {task.priority === 'high' ? 'Высокий' :
                             task.priority === 'medium' ? 'Средний' : 'Низкий'}
                          </Badge>
                        </div>
                      </div>
                      <div className="ml-4 text-right">
                        <p className="text-sm">{task.estimatedDays} дней</p>
                        {task.assignee && (
                          <SimpleAvatar className="ml-auto mt-2 h-6 w-6">
                            <SimpleAvatarFallback className="text-xs">{task.assignee}</SimpleAvatarFallback>
                          </SimpleAvatar>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      {showAddTask && (
        <AddTaskDialog
          boardType="waterfall"
          onClose={() => setShowAddTask(false)}
          onAdd={handleAddTask}
        />
      )}
    </div>
  );
}

const waterfallPhases = [
  { value: 'analysis', label: 'Анализ требований' },
  { value: 'design', label: 'Проектирование' },
  { value: 'development', label: 'Разработка' },
  { value: 'testing', label: 'Тестирование' },
  { value: 'deployment', label: 'Внедрение' },
];