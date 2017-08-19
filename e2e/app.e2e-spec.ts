import { StudentRandomizerPage } from './app.po';

describe('student-randomizer App', () => {
  let page: StudentRandomizerPage;

  beforeEach(() => {
    page = new StudentRandomizerPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
