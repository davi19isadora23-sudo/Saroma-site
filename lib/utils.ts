import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateWhatsAppMessage(products: Array<{ name: string; price: number; quantity: number }>) {
  const itemsList = products
    .map(p => `• ${p.name} (${p.quantity}x) - R$ ${(p.price * p.quantity).toFixed(2)}`)
    .join('\n')
  
  const total = products.reduce((sum, p) => sum + (p.price * p.quantity), 0)
  
  return `Olá! Tenho interesse nos seguintes produtos:\n\n${itemsList}\n\nTotal: R$ ${total.toFixed(2)}`
}

export function openWhatsAppCart(message: string, phoneNumber: string = '5544984147413') {
  const encodedMessage = encodeURIComponent(message)
  window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank')
}
