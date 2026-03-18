interface Lesson {
  id: string; slug: string; courseId: string; title: string;
  description: string; duration: string; order: number;
  videoUrl: string; isFree: boolean;
}

interface LessonCardProps {
  lesson: Lesson;
  completed?: boolean;
  active?: boolean;
}

export default function LessonCard({ lesson, completed = false, active = false }: LessonCardProps) {
  return (
    <div className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${active ? 'bg-blue-500/10 border-blue-500/30' : 'bg-[#0f0f1a] border-[#1f1f2e] hover:border-[#2f2f4e]'}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${completed ? 'bg-green-500 text-white' : active ? 'bg-blue-500 text-white' : 'bg-[#1f1f2e] text-[#6b7280]'}`}>
        {completed ? (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
        ) : lesson.order}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <h4 className={`text-sm font-medium truncate ${active ? 'text-blue-400' : 'text-[#f0f0f0]'}`}>{lesson.title}</h4>
          {lesson.isFree && <span className="text-xs bg-green-500/10 text-green-400 border border-green-500/20 px-1.5 py-0.5 rounded shrink-0">Free</span>}
        </div>
        <span className="text-xs text-[#6b7280]">{lesson.duration}</span>
      </div>

      <div>
        {lesson.isFree || completed ? (
          <svg className="w-5 h-5 text-[#6b7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ) : (
          <svg className="w-4 h-4 text-[#6b7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        )}
      </div>
    </div>
  );
}
