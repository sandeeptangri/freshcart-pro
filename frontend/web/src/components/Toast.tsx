'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

interface Toast {
  id: string
  message: string
  icon?: string
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = (message: string, icon?: string) => {
    const id = Math.random().toString(36).substring(7)
    setToasts(prev => [...prev, { id, message, icon }])
    
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 3000)
  }

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }

  return { toasts, showToast, removeToast }
}

export function ToastContainer({ toasts, onRemove }: { toasts: Toast[], onRemove: (id: string) => void }) {
  if (toasts.length === 0) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className="bg-gray-900 text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 min-w-[300px] animate-in slide-in-from-right duration-300"
        >
          {toast.icon && <span className="text-xl">{toast.icon}</span>}
          <span className="flex-1 font-medium">{toast.message}</span>
          <button
            onClick={() => onRemove(toast.id)}
            className="text-gray-400 hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  )
}
