export const NOTE_LIST_KEY = 'note_lists';

const getNotesList = (): {
  name: string,
  id: string,
}[] => {
  const rawList = localStorage.getItem(NOTE_LIST_KEY) || '[]';
  const list = JSON.parse(rawList);

  return list;
};

export default getNotesList;
