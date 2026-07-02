// types/analysis.ts
export interface MarketAnalysis {
  market: string;
  line: number;
  projection: number;
  averageL10: number;
  streakL5: boolean[];
  confidence: number;
  grade: 'A' | 'B' | 'C';
  recommendation: 'over' | 'under' | 'none';
  odds?: number;
}

export interface PlayerAnalysis {
  playerId: number;
  playerName: string;
  team: string;
  goalsAvg: number;
  assistsAvg: number;
  last5Goals: number[];
  last5Assists: number[];
  confidence: number;
}

export interface MultiplaCombinada {
  playersToScore: PlayerAnalysis[];
  playersToAssist: PlayerAnalysis[];
  totalConfidence: number;
  grade: 'A' | 'B' | 'C';
}

export interface MatchAnalysis {
  fixtureId: number;
  homeTeam: string;
  awayTeam: string;
  league: string;
  date: string;
  markets: MarketAnalysis[];
  multipla: MultiplaCombinada;
  overallConfidence: number;
  overallGrade: 'A' | 'B' | 'C';
}

export interface TeamStats {
  teamId: number;
  teamName: string;
  cornersFor: number[];
  cornersAgainst: number[];
  goalsFor: number[];
  goalsAgainst: number[];
  cardsFor: number[];
  cardsAgainst: number[];
  shotsOnTargetFor: number[];
  shotsOnTargetAgainst: number[];
}
