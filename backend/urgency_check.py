URGENCY_KEYWORDS = {
    'seizure', 'jhatke', 'khoon', 'bleeding', 'saans nahi',
    'not breathing', 'behosh', 'unconscious', 'nahi uth raha',
    'convulsion', 'postpartum', 'prasav ke baad khoon'
}

def urgency_check(text: str) -> str:
    t = text.lower()
    for kw in URGENCY_KEYWORDS:
        if kw in t:
            return 'high'
    return 'normal'
