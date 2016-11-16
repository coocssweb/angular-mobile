import { WeddingTaskPage } from './app.po';

describe('wedding-task App', function() {
  let page: WeddingTaskPage;

  beforeEach(() => {
    page = new WeddingTaskPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
