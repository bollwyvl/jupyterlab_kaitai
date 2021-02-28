import { IRenderMime } from '@jupyterlab/rendermime-interfaces';
import { Widget } from '@lumino/widgets';

/**
 * The default mime type for the extension.
 */
export const MIME_TYPE = 'application/octet-stream';

/**
 * The class name added to the extension.
 */
const CLASS_NAME = 'mimerenderer-hexviewer';

/**
 * A widget for rendering {{cookiecutter.mimetype_name}}.
 */
export class OutputWidget extends Widget implements IRenderMime.IRenderer {
  /**
   * Construct a new output widget.
   */
  constructor(options: IRenderMime.IRendererOptions) {
    console.log('Hey, making a new renderer');
    super();
    this._mimeType = options.mimeType;
    this.addClass(CLASS_NAME);
  }

  /**
   * Render {{cookiecutter.mimetype_name}} into this widget's node.
   */
  renderModel(model: IRenderMime.IMimeModel): Promise<void> {
    const data = model.data[this._mimeType] as string;
    this.node.textContent = data.slice(0, 16384);
    return Promise.resolve();
  }

  private _mimeType: string;
}

/**
 * A mime renderer factory for {{cookiecutter.mimetype_name}} data.
 */
export const rendererFactory: IRenderMime.IRendererFactory = {
  safe: true,
  mimeTypes: [MIME_TYPE],
  createRenderer: options => new OutputWidget(options)
};

/**
 * Extension definition.
 */
const extension: IRenderMime.IExtension = {
  id: ':plugin',
  rendererFactory,
  rank: 0,
  dataType: 'string',
  fileTypes: [
    {
      name: 'mimerenderer-hexviewer',
      mimeTypes: [MIME_TYPE],
      extensions: ['*.bin']
    }
  ],
  documentWidgetFactoryOptions: {
    name: 'hexviewer',
    primaryFileType: 'application/octet-stream',
    fileTypes: ['mimerenderer-hexviewer'],
    defaultFor: ['mimerenderer-hexviewer']
  }
};

export default extension;