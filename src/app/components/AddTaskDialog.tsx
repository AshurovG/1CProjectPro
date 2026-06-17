import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { X } from "lucide-react";
import { SimpleSelect } from "./SimpleSelect";

interface AddTaskDialogProps {
  onClose: () => void;
  onAdd: (task: NewTask) => void;
  boardType: 'scrum' | 'waterfall';
}

export interface NewTask {
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  assignee?: string;
  storyPoints?: number;
  phase?: string;
  estimatedDays?: number;
}

const priorityOptions = [
  { value: 'low', label: 'Низкий' },
  { value: 'medium', label: 'Средний' },
  { value: 'high', label: 'Высокий' },
];

const teamMembers = [
  { value: '', label: 'Не назначено' },
  { value: 'ИХ', label: 'Ильмира Хайруллова' },
  { value: 'ИС', label: 'Иван Смирнов' },
  { value: 'МК', label: 'Мария Козлова' },
  { value: 'ПВ', label: 'Петр Волков' },
  { value: 'ЕН', label: 'Елена Новикова' },
];

const waterfallPhases = [
  { value: 'analysis', label: 'Анализ требований' },
  { value: 'design', label: 'Проектирование' },
  { value: 'development', label: 'Разработка' },
  { value: 'testing', label: 'Тестирование' },
  { value: 'deployment', label: 'Внедрение' },
];

export function AddTaskDialog({ onClose, onAdd, boardType }: AddTaskDialogProps) {
  const [formData, setFormData] = useState<NewTask>({
    title: '',
    description: '',
    priority: 'medium',
    assignee: '',
    storyPoints: boardType === 'scrum' ? 3 : undefined,
    phase: boardType === 'waterfall' ? 'development' : undefined,
    estimatedDays: boardType === 'waterfall' ? 5 : undefined,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title.trim()) {
      onAdd(formData);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-2xl rounded-lg bg-background shadow-lg">
        <div className="flex items-center justify-between border-b p-6">
          <div>
            <h2 className="mb-1">Новая задача</h2>
            <p className="text-sm text-muted-foreground">
              {boardType === 'scrum' ? 'Добавление задачи в спринт' : 'Добавление задачи в фазу проекта'}
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 p-6">
            <div className="space-y-2">
              <Label htmlFor="title">Название задачи</Label>
              <Input
                id="title"
                placeholder="Например: Разработать форму авторизации"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Описание</Label>
              <Textarea
                id="description"
                placeholder="Подробное описание задачи..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="priority">Приоритет</Label>
                <SimpleSelect
                  value={formData.priority}
                  onChange={(value) => setFormData({ ...formData, priority: value as 'low' | 'medium' | 'high' })}
                  options={priorityOptions}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="assignee">Исполнитель</Label>
                <SimpleSelect
                  value={formData.assignee || ''}
                  onChange={(value) => setFormData({ ...formData, assignee: value })}
                  options={teamMembers}
                />
              </div>
            </div>

            {boardType === 'scrum' && (
              <div className="space-y-2">
                <Label htmlFor="storyPoints">Story Points</Label>
                <Input
                  id="storyPoints"
                  type="number"
                  min="1"
                  max="21"
                  value={formData.storyPoints}
                  onChange={(e) => setFormData({ ...formData, storyPoints: parseInt(e.target.value) })}
                  placeholder="Оценка сложности (1-21)"
                />
                <p className="text-xs text-muted-foreground">
                  Фибоначчи: 1, 2, 3, 5, 8, 13, 21
                </p>
              </div>
            )}

            {boardType === 'waterfall' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="phase">Фаза проекта</Label>
                  <SimpleSelect
                    value={formData.phase || 'development'}
                    onChange={(value) => setFormData({ ...formData, phase: value })}
                    options={waterfallPhases}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="estimatedDays">Оценка времени (дни)</Label>
                  <Input
                    id="estimatedDays"
                    type="number"
                    min="1"
                    value={formData.estimatedDays}
                    onChange={(e) => setFormData({ ...formData, estimatedDays: parseInt(e.target.value) })}
                    placeholder="Количество дней"
                  />
                </div>
              </>
            )}

            <div className="rounded-lg border bg-muted/50 p-4">
              <p className="text-sm">
                {boardType === 'scrum' 
                  ? '💡 Задача будет добавлена в текущий спринт и появится в колонке "К выполнению"'
                  : '💡 Задача будет добавлена в выбранную фазу проекта'
                }
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-2 border-t p-6">
            <Button type="button" variant="outline" onClick={onClose}>
              Отмена
            </Button>
            <Button type="submit" disabled={!formData.title.trim()}>
              Создать задачу
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
