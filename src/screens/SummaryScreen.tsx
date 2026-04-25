import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { story } from '../game/story'
import type { GameHistoryEntry, StatKey, Stats } from '../game/types'

const statLabels: Record<StatKey, string> = {
  talent: 'Талант',
  craft: 'Ремесло',
  watching: 'Насмотренность',
  teamTrust: 'Доверие команды',
  audienceContact: 'Контакт со зрителем',
  projectViability: 'Жизнеспособность',
  staminaEnergy: 'Выносливость',
}

export function SummaryScreen({
  stats,
  history,
  onRestart,
}: {
  stats: Stats
  history: GameHistoryEntry[]
  onRestart: () => void
}) {
  const finalEntry = history.findLast((h) => h.kind === 'final') as
    | { kind: 'final'; choiceId: string }
    | undefined
  const finalChoice = finalEntry
    ? story.final?.choices.find((c) => c.id === finalEntry.choiceId) ?? null
    : null

  return (
    <div className="screen">
      <Card>
        <h1 className="title">Итог</h1>
        <p className="lead">
          Спасибо за прохождение. Вы можете пересобрать путь и сравнить, как меняются
          решения и показатели.
        </p>

        {finalChoice && (
          <div className="blockSection">
            <div className="sectionLabel">Ваш финал</div>
            <div className="pickLine">
              <span className="pickId">{finalChoice.id}</span>
              <span className="pickLabel">{finalChoice.label}</span>
            </div>
            {finalChoice.consequence && (
              <div className="sectionBody prewrap" style={{ marginTop: 12 }}>
                {finalChoice.consequence}
              </div>
            )}
            {finalChoice.analysis && (
              <div className="sectionBody prewrap" style={{ marginTop: 12 }}>
                {finalChoice.analysis}
              </div>
            )}
          </div>
        )}

        <div className="blockSection">
          <div className="sectionLabel">Финальные показатели</div>
          <div className="statsSummary">
            {Object.entries(stats).map(([k, v]) => (
              <div className="statsSummaryItem" key={k}>
                <div className="statsSummaryKey">{statLabels[k as StatKey] ?? k}</div>
                <div className="statsSummaryVal">{v}</div>
              </div>
            ))}
          </div>
        </div>

        <details className="history">
          <summary>Показать путь (выборы)</summary>
          <ol>
            {history.map((h, idx) => (
              <li key={idx}>
                {h.kind === 'block' ? `Блок ${h.blockId}: ${h.choiceId}` : `Финал: ${h.choiceId}`}
              </li>
            ))}
          </ol>
        </details>

        <div className="actions">
          <Button onClick={onRestart}>Начать заново</Button>
        </div>
      </Card>
    </div>
  )
}

