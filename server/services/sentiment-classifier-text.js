import { pipeline } from '@xenova/transformers'

class TextClassificationPipeline {
  static model // 'Xenova/bert-base-multilingual-uncased-sentiment'// 'Xenova/distilbert-base-uncased-finetuned-sst-2-english'
  static instance

  constructor ({ model }) {
    if (TextClassificationPipeline.model !== model) TextClassificationPipeline.instance = undefined
    TextClassificationPipeline.model = model
    this.task = 'text-classification'
  }

  async getInstance ({ onProgress } = {}) {
    if (TextClassificationPipeline.instance) return TextClassificationPipeline.instance

    TextClassificationPipeline.instance = await pipeline(
      this.task,
      TextClassificationPipeline.model,
      { progress_callback: onProgress }
    )
    return TextClassificationPipeline.instance
  }
}

export const sentimentClassifyText = async (text) => {
  const model = 'Xenova/distilbert-base-uncased-finetuned-sst-2-english'
  const classifier = await new TextClassificationPipeline({ model }).getInstance()
  return await classifier(text)
}

export const rateClassifyText = async (text) => {
  const model = 'Xenova/bert-base-multilingual-uncased-sentiment'
  const classifier = await new TextClassificationPipeline({ model }).getInstance()
  return await classifier(text)
}
