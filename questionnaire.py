def get_level(score):
    if 0 <= score <= 8:
        return 'Very Low'
    elif 9 <= score <= 16:
        return 'Mild'
    elif 17 <= score <= 24:
        return 'Moderate'
    else:
        return 'Severe'


def get_anxiety(scores):
    scores = [int(score) for score in scores]
    anxiety_score = sum(scores)
    anxiety_level = get_level(anxiety_score)

    if anxiety_level == 'Very Low':
        return 'Your symptoms indicate very low levels of anxiety. This is a positive sign, suggesting that you are managing well. To maintain your well-being, continue practicing relaxation techniques such as deep breathing exercises or progressive muscle relaxation. Engaging in regular physical activity and maintaining a balanced lifestyle can also be beneficial.'
    elif anxiety_level == 'Mild':
        return 'Your symptoms suggest mild levels of anxiety. While they may not be severely impacting your life, it\'s important to address them early on. Consider incorporating stress-reduction techniques into your daily routine, such as mindfulness meditation or yoga. Setting realistic goals and boundaries, as well as seeking support from friends and loved ones, can also help alleviate symptoms.'
    elif anxiety_level == 'Moderate':
        return 'Your symptoms indicate moderate levels of anxiety, suggesting that they may be significantly affecting your daily life. It\'s crucial to prioritize self-care and seek assistance from a mental health professional for tailored support and treatment. Cognitive-behavioral therapy (CBT) or exposure therapy may be helpful in managing anxiety symptoms. Additionally, medication prescribed by a healthcare provider may be considered if necessary.'
    else:
        return 'Your symptoms suggest severe levels of anxiety, indicating significant impairment in functioning and well-being. It\'s imperative to seek immediate professional help from a mental health provider for comprehensive evaluation and treatment. Therapy modalities such as CBT, dialectical behavior therapy (DBT), or medication management may be recommended to help you regain control over your anxiety symptoms. Practicing self-care strategies, maintaining a healthy lifestyle, and avoiding triggers can also contribute to your overall well-being.'

def get_depression(scores):
    scores = [int(score) for score in scores]
    depression_score = sum(scores)
    depression_level = get_level(depression_score)

    if depression_level == 'Very Low':
        return 'Your symptoms indicate very low levels of depression. This is a positive indication that you are managing well. To maintain your mental health, continue engaging in activities that bring you joy and fulfillment. Spending time with loved ones, practicing gratitude, and pursuing hobbies can help boost your mood and resilience.'
    elif depression_level == 'Mild':
        return 'Your symptoms suggest mild levels of depression. While they may not be severely impacting your life, it\'s essential to address them early on. Consider seeking support from a mental health professional who can provide guidance and support tailored to your needs. Therapy, such as cognitive-behavioral therapy (CBT) or interpersonal therapy, can help you learn coping skills and address underlying issues contributing to your depression.'
    elif depression_level == 'Moderate':
        return 'Your symptoms indicate moderate levels of depression, suggesting that they may be significantly affecting your daily functioning. It\'s crucial to prioritize self-care and seek assistance from a mental health professional for personalized treatment. Therapy, medication, or a combination of both may be recommended to help manage your symptoms effectively. Additionally, maintaining a routine, setting achievable goals, and staying connected with supportive individuals can aid in your recovery process.'
    else:
        return 'Your symptoms suggest severe levels of depression, indicating significant impairment in mood and functioning. It\'s essential to seek immediate help from a mental health professional for comprehensive evaluation and treatment. Therapy, including intensive outpatient programs or residential treatment, may be necessary to address your depression effectively. Medication management and hospitalization may also be considered in severe cases. Remember, recovery is possible with proper support and treatment.'


def get_ptsd(scores):
    scores = [int(score) for score in scores]
    ptsd_score = sum(scores)
    ptsd_score_level = get_level(ptsd_score)

    if ptsd_score_level == 'Very Low':
        return 'Your symptoms indicate very low levels of PTSD. This is a positive sign, suggesting that you are coping well. To maintain your mental well-being, continue engaging in self-care activities such as journaling, spending time in nature, or practicing relaxation techniques. Surrounding yourself with supportive individuals and maintaining healthy boundaries can also contribute to your resilience.'
    elif ptsd_score_level == 'Mild':
        return 'Your symptoms suggest mild levels of PTSD. While they may not be severely impacting your life, it\'s important to address them early on. Consider seeking support from a mental health professional who specializes in trauma treatment. Therapy modalities such as cognitive processing therapy (CPT) or prolonged exposure therapy (PE) can help you process traumatic experiences and develop coping strategies.'
    elif ptsd_score_level == 'Moderate':
        return 'Your symptoms indicate moderate levels of PTSD, suggesting that they may be significantly impacting your daily life and functioning. It\'s crucial to seek professional help from a mental health provider experienced in treating trauma. Therapy modalities such as Eye Movement Desensitization and Reprocessing (EMDR) or trauma-focused CBT can be beneficial in addressing your symptoms and improving your quality of life.'
    else:
        return 'Your symptoms suggest severe levels of PTSD, indicating significant impairment in functioning and well-being. It\'s essential to seek immediate help from a mental health professional who specializes in trauma treatment. Intensive therapy, such as residential treatment or trauma-focused therapy programs, may be necessary to address your symptoms effectively. Additionally, medication management and support from loved ones can aid in your recovery journey. Remember, healing is possible with proper support and treatment.'