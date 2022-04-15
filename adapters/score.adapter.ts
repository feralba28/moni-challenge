import { Score } from '@/models/score.model'

export const formatStatus = (status: string): string => {
  return status === 'APROVED' ? 'APROBADA' : 'RECHAZADA'
}

export const createScoreAdapter = (score: any): Score => {
  return {
    status: score.data.status === 'approve' ? 'APROVED' : 'REJECTED'
  }
}
