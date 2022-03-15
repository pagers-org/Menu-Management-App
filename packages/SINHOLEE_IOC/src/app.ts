import {TextSectionInput} from './components/dialog/input/text-input.js';
import {MediaSectionInput} from './components/dialog/input/media-input.js';
import {InputDialog} from './components/dialog/dialog.js';
import {VideoComponent} from './components/page/item/video.js';
import {TodoComponent} from './components/page/item/todo.js';
import {NoteComponent} from './components/page/item/note.js';
import {ImageComponent} from './components/page/item/image.js';
import {Composable, PageComponent, PageItemComponent} from './components/page/page.js';
import {BaseComponent, Component} from './components/component.js';
import {MediaArgs, TextArgs} from "./components/dialog/input/SectionInput";

interface InputSectionConstructor<T extends (TextArgs | MediaArgs)> {
    new(): T & Component
}
type ItemType = 'image' | 'todo' | 'note' | 'video'
type ButtonMeta = { itemType: ItemType }

class App {
    private readonly BUTTON_CONSTANT: ButtonMeta[] = [{itemType: 'image'}, {itemType: 'note'}, {itemType: 'todo'}, {itemType: 'video'}]
    private readonly page: Component & Composable;
    private readonly dialogRoot: HTMLElement

    constructor(appRoot: HTMLElement, dialogRoot: HTMLElement) {
        this.dialogRoot = dialogRoot
        this.page = new PageComponent(PageItemComponent);
        this.page.attachTo(appRoot);

        this.BUTTON_CONSTANT.forEach(({itemType}) => {
            const btn = document.querySelector(this.itemTypeToSelector(itemType))! as HTMLButtonElement;
            btn.addEventListener('click', () => {
                this.addEventFactory(itemType)
            });
        })
    }

    private addEvent<T extends (TextArgs | MediaArgs)>(inputSectionConstructor: InputSectionConstructor<T>, createItem: (inputSection: T) => Component) {
        const inputSection = new inputSectionConstructor()
        const dialog = new InputDialog();
        dialog.addChild(inputSection);
        dialog.attachTo(this.dialogRoot);

        dialog.setOnCloseListenr(() => {
            dialog.removeFrom(this.dialogRoot);
        });
        dialog.setOnSubmitListenr(() => {
            const item = createItem(inputSection);
            this.page.addChild(item);
            dialog.removeFrom(this.dialogRoot);
        });
    }

    private itemTypeToSelector(itemType:ItemType): string {
        return `#new-${itemType}`
    }

    private addEventFactory(itemType: ItemType) {


        const createTodoFactory = (input: TextSectionInput) => {
            return input.title.length > 5 ? new TodoComponent(input.title, input.body) : new Hoverable(new TodoComponent(input.title, input.body))
        }
        switch (itemType) {
            case 'image':
                return this.addEvent(MediaSectionInput, (input) => new ImageComponent(input.title, input.url))
            case 'video':
                return this.addEvent(MediaSectionInput, (input) => new VideoComponent(input.title, input.url))
            case 'todo':
                return this.addEvent(TextSectionInput, createTodoFactory)
            case 'note':
                return this.addEvent(TextSectionInput, (input) => new NoteComponent(input.title, input.body))
            default:
                throw new Error('itemType should ')
        }

    }
}

new App(document.querySelector('.document')! as HTMLElement, document.body);


class Hoverable extends BaseComponent<HTMLElement> {

    constructor(component: Component) {
        super(`
        <div class="hoverable"><div>
        `);
        this.element.addEventListener('mouseover', () => console.log('hovered'))
        this.element.addEventListener('mouseout', () => console.log('unhovered'))

        component.attachTo(this.element)
    }
}