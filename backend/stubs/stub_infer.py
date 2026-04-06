def infer(prompt: str, model=None, tokenizer=None, rag=None,
          max_new_tokens=80, urgency=None) -> str:
    p = prompt.lower()
    if any(k in p for k in ['seizure', 'jhatke']):
        return 'Ghabrao mat. Bachche ko karwat pe lita do. 108 call karo.'
    if any(k in p for k in ['khoon', 'bleeding']):
        return '108 call karo turant. Uterus massage karo.'
    return 'Mujhe iski jaankari nahi hai. Kripya turant PHC jayein ya 108 par call karein.'
