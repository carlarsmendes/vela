import type { CyclePhase, CycleSummary, PeriodEntryRecord, ProfileRecord, TrainingFocus } from "@/types";

function differenceInDays(dateLeft: Date, dateRight: Date) {
  return Math.floor((dateLeft.getTime() - dateRight.getTime()) / (1000 * 60 * 60 * 24));
}

function formatDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

function getCyclePhase(cycleDay: number | null, averageCycleLength: number | null): CyclePhase {
  if (!cycleDay || !averageCycleLength) {
    return "Unknown";
  }

  if (cycleDay <= 5) {
    return "Menstrual";
  }

  if (cycleDay <= Math.max(12, averageCycleLength - 16)) {
    return "Follicular";
  }

  if (cycleDay <= Math.max(15, averageCycleLength - 12)) {
    return "Ovulatory";
  }

  return "Luteal";
}

function getTrainingRecommendation(phase: CyclePhase, trainingFocus: TrainingFocus | null) {
  const genericRecommendations: Record<CyclePhase, { title: string; detail: string }> = {
    Menstrual: {
      title: "A steadier effort may suit today",
      detail: "Recovery, technique work, or lower-pressure sessions may be the better fit right now.",
    },
    Follicular: {
      title: "Today may support stronger efforts",
      detail: "This phase may be a good window for building intensity, volume, or confidence in training.",
    },
    Ovulatory: {
      title: "Power and confidence may feel more available",
      detail: "If energy feels good, this can be a strong window for sharper efforts or heavier work.",
    },
    Luteal: {
      title: "Energy may be more variable right now",
      detail: "A steadier pace, clear structure, and a little more flexibility may suit this phase better.",
    },
    Unknown: {
      title: "Keep building your record",
      detail: "Once more cycle data is logged, Vela can offer clearer phase-aware context here.",
    },
  };

  const focusAdjustments: Record<TrainingFocus, Partial<Record<CyclePhase, string>>> = {
    crossfit: {
      Follicular: "If the day feels good, heavier lifts, denser sessions, or harder mixed efforts may fit well.",
      Ovulatory: "Explosive work, stronger lifts, or sharper conditioning may feel more available.",
      Luteal: "More controlled intensity, simpler structures, or strength maintenance may suit today better.",
      Menstrual: "Technique work, easy aerobic work, or scaled sessions may feel more manageable.",
    },
    running: {
      Follicular: "This may be a useful window for quicker sessions, longer runs, or stronger workouts.",
      Ovulatory: "If energy is there, sharper work or race-pace efforts may feel more supported.",
      Luteal: "A steadier run, aerobic work, or lower-pressure pacing may suit today better.",
      Menstrual: "Easy running, shorter sessions, or full recovery may be the better call.",
    },
    both: {},
  };

  const base = genericRecommendations[phase];
  const detail = trainingFocus ? focusAdjustments[trainingFocus][phase] ?? base.detail : base.detail;

  return {
    title: base.title,
    detail,
  };
}

export function buildCycleSummary(
  profile: ProfileRecord | null,
  periodEntries: PeriodEntryRecord[],
): CycleSummary {
  const latestEntry = [...periodEntries].sort((left, right) =>
    left.start_date < right.start_date ? 1 : -1,
  )[0];
  const averageCycleLength = profile?.average_cycle_length ?? null;

  if (!latestEntry || !averageCycleLength) {
    const recommendation = getTrainingRecommendation("Unknown", profile?.training_focus ?? null);

    return {
      currentPhase: "Unknown",
      cycleDay: null,
      predictedNextPeriod: null,
      daysUntilNextPeriod: null,
      trainingRecommendation: recommendation.title,
      recommendationDetail: recommendation.detail,
    };
  }

  const today = new Date();
  const latestStart = new Date(latestEntry.start_date);
  const cycleDay = differenceInDays(today, latestStart) + 1;
  const predictedNextPeriodDate = new Date(latestStart);
  predictedNextPeriodDate.setDate(predictedNextPeriodDate.getDate() + averageCycleLength);

  const daysUntilNextPeriod = differenceInDays(predictedNextPeriodDate, today);
  const currentPhase = getCyclePhase(cycleDay, averageCycleLength);
  const recommendation = getTrainingRecommendation(currentPhase, profile?.training_focus ?? null);

  return {
    currentPhase,
    cycleDay: cycleDay > 0 ? cycleDay : null,
    predictedNextPeriod: formatDate(predictedNextPeriodDate),
    daysUntilNextPeriod: Math.max(daysUntilNextPeriod, 0),
    trainingRecommendation: recommendation.title,
    recommendationDetail: recommendation.detail,
  };
}
