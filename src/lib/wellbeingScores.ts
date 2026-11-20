// Example scores for the six domains in VanderWeele's Secure Flourish measure.
function calculateHappinessAndLifeSatisfaction(): number {
  return 8;
}

function calculateMentalAndPhysicalHealth(): number {
  return 6;
}

function calculateMeaningAndPurpose(): number {
  return 8.5;
}

function calculateCharacterAndVirtue(): number {
  return 7;
}

function calculateCloseSocialRelationships(): number {
  return 8;
}

function calculateFinancialAndMaterialStability(): number {
  return 6.5;
}

export function getWellbeingScores() {
  return [
    { label: "Happiness and Life Satisfaction", score: calculateHappinessAndLifeSatisfaction() },
    { label: "Mental and Physical Health", score: calculateMentalAndPhysicalHealth() },
    { label: "Meaning and Purpose", score: calculateMeaningAndPurpose() },
    { label: "Character and Virtue", score: calculateCharacterAndVirtue() },
    { label: "Close Social Relationships", score: calculateCloseSocialRelationships() },
    { label: "Financial and Material Stability", score: calculateFinancialAndMaterialStability() },
  ];
}
