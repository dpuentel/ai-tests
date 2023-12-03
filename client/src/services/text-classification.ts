import { pipeline, Pipeline } from '@xenova/transformers'

class TextClassificationPipeline {
  private task: string
  private static model: string //'Xenova/bert-base-multilingual-uncased-sentiment'// 'Xenova/distilbert-base-uncased-finetuned-sst-2-english'
  private static instance?: Pipeline

  public constructor({ model }: { model: string }) {
    if (TextClassificationPipeline.model !== model) TextClassificationPipeline.instance = undefined
    TextClassificationPipeline.model = model
    this.task = 'text-classification'
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  async getInstance( {onProgress} : {onProgress?: Function} = {}) {
    if (TextClassificationPipeline.instance) return TextClassificationPipeline.instance

    TextClassificationPipeline.instance = await pipeline(
      this.task,
      TextClassificationPipeline.model,
      { progress_callback: onProgress }
    )
    return TextClassificationPipeline.instance
  }
}

export const sentimentClassifyText = async (text: string) => {
  const model = 'Xenova/distilbert-base-uncased-finetuned-sst-2-english'
  const classifier = await new TextClassificationPipeline({ model }).getInstance()
  return await classifier(text)
}

// classify form 1 to 5
export const rateClassifyText = async (text: string) => {
  const model = 'Xenova/bert-base-multilingual-uncased-sentiment'
  const classifier = await new TextClassificationPipeline({ model }).getInstance()
  return await classifier(text)
}
