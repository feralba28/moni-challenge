import { Score } from '@/models/score.model'

const formatStatus = (status: string): string => {
  return status == 'approve' ? 'APROVED' : 'REJECTED'
}

export const createScoreAdapter = (score: any): Score => {
  return {
    status: formatStatus(score.data.status),
  }
}
