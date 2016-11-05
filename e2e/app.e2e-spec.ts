import { StudioCuswebPage } from './app.po';

describe('studio-cusweb App', function() {
  let page: StudioCuswebPage;

  beforeEach(() => {
    page = new StudioCuswebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
