import { $$, by } from "protractor";

export class HomePageLocators {
  public static logo = by.id("site-title");
  public static tagLine = by.className("tagline");
  public static searchField = by.css("aside .search-field");
  public static searchSubmit = by.css("aside .search-submit");
  public static numberOfBlogs = by.css("h1.post-title");
  public static searchResult = by.css(
    "h2 a[href*='protractor-for-smooth-e2e-automation']"
  );
  public static recentPosts = by.css(".recent-news-section .news-item");
  public static newsletterField = by.css("[type='email']");
  public static newsletterFieldButton = by.css("[value='SUBSCRIBE']");
  public static successSubscribeMsg = by.css(".mc4wp-response");
  public static categoryMenu = by.id("menu-item-366");
  public static categoryPostsHeader = by.css("[id='main'] h1");
  public static linkedinButton = by.css("li a[href*='in/vladimir-simonovski']");
  public static categories = [
    by.id("menu-item-872"),
    by.id("menu-item-361"),
    by.id("menu-item-362"),
    by.id("menu-item-363"),
    by.id("menu-item-365"),
  ];
}

export class GetInTouchPageLocators {
  public static firstName = by.id("wpforms-211-field_0");
  public static lastName = by.id("wpforms-211-field_0-last");
  public static email = by.id("wpforms-211-field_1");
  public static comment = by.id("wpforms-211-field_2");
  public static confirmationMessage = by.id("wpforms-confirmation-211");
  public static submit = by.id("wpforms-submit-211");
  public static fieldsFailValidationMessage = [
    by.id("wpforms-211-field_0-error"),
    by.id("wpforms-211-field_0-last-error"),
    by.id("wpforms-211-field_1-error"),
    by.id("wpforms-211-field_2-error"),
  ];
}
