Feature: Sending email

  @demo
  Scenario: User can send an email
    Given the User logged in to the system
    Then the User navigated to the "Вхідні" page
    And the menu options are available:
      | Вхідні      |
      | Відправлені |
      | Чернетки    |
      | Видалені    |
      | Спам        |
    When the User click on the "Створити листа" link
    Then the User navigated to the "Новий лист" page
    And the "Створити листа" page is displayed properly
    When the User fills all required information for the letter
    And the User clicks "Надіслати"
    Then the "Лист успішно відправлено адресатам" page message should be present
