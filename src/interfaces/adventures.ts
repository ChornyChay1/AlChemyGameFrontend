// models.ts

export enum QuestionType {
    TEST = "TestQuestion",
    CLOSE = "CloseQuestion",
    COMPLIANCE = "ComplianceQuestion",
    RATIO = "RatioQuestion",
}

export interface FileInfo {
    id: number;
    name: string;
}

export interface QuestionBase {
    question_text: string;
    question_type: QuestionType;
}

export interface QuestionCommon extends QuestionBase {
    answer?: string;
    formula_id?: number;
    left_expression?: string[];
    right_expression?: string[];
    right_association?: Record<string, string>;
    answers: string[];
    correct_index?: number;
}

export interface CloseQuestionModel extends QuestionBase {
    answer: string;
    question_type: QuestionType.CLOSE;
}

export interface TestQuestionModel extends QuestionBase {
    available_answers: string[];
    correct_index: number;
    question_type: QuestionType.TEST;
}

export interface ComplianceQuestionModel extends QuestionBase {
    left_expression: string[];
    right_expression: string[];
    right_association: Record<string, string>;
    question_type: QuestionType.COMPLIANCE;
}

export interface RatioQuestionModel extends QuestionBase {
    formula_id: number;
    answer: string;
    question_type: QuestionType.RATIO;
}

export enum TopicType {
    COMMON = "CommonTopic",
    PRACTICAL = "PracticalTopic",
}

export interface TopicModel {
    id: number;
    topic_name: string;
    topic_text: string;
    questions: QuestionCommon[];
    topic_type: TopicType;
    next_topic_id?: number;
    theory_id:number
    video_id:number

    x: number;
    y: number;
}

export interface AdventureModel {
    id: number;
    name: string;
    image_id: number;
    adventure_text:string;
    topics: TopicModel[];
}

export interface UserAdventureModel {
    id: number;
    user_id: number;
    adventure_id: number;
    current_topic_index: number;
}
