// not a great function
function getElement(id: string) {
  const el = document?.getElementById(id); // Type is HTMLElement | null

  return el?.innerHTML;
}

// can use instanceof - but don't
// property checks work in much the same way - a bit better
function contains(text: string, search: string | RegExp) {
  if (search instanceof RegExp) {
    return !!search.exec(text); // Type is RegExp
  }
  return text.includes(search); // Type is string
}

// never use typeof == 'object, as null is type object

// first can use a discriminated union
interface UploadEvent {
  type: 'upload';
  filename: string;
  contents: string;
}
interface DownloadEvent {
  type: 'download';
  filename: string;
}
type AppEvent = UploadEvent | DownloadEvent;
function handleEvent(e: AppEvent) {
  switch (e.type) {
    case 'download':
      e; // Type is DownloadEvent
      break;
    case 'upload':
      e; // Type is UploadEvent
      break;
  }
}

// use user-defined type guards

// eg 1
function isInputElement(el: HTMLElement): el is HTMLInputElement {
  return 'value' in el;
}

function getElementContent(el: HTMLElement) {
  if (isInputElement(el)) {
    el; // Type is HTMLInputElement
    return el.value;
  }
  el; // Type is HTMLElement
  return el.textContent;
}

//udtgs can remove mutable types from lists
const jackson5 = ['Jackie', 'Tito', 'Jermaine', 'Marlon', 'Michael'];
function isDefined<T>(x: T | undefined): x is T {
  return x !== undefined;
}
const members = ['Janet', 'Michael']
  .map((m) => jackson5.find((j) => j === m))
  .filter(isDefined); // Type is string[]

console.log({ members });
