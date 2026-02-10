import re
import time
from pathlib import Path

import pytest
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as ec
from selenium.webdriver.support.ui import WebDriverWait
from webdriver_manager.chrome import ChromeDriverManager


@pytest.fixture
def driver():
    """Initialize and configure a Chrome WebDriver instance for testing.

    Configures the driver to use ChromeDriverManager for automatic driver
    management and maximizes the browser window.

    Yields:
        webdriver.Chrome: A configured Chrome WebDriver instance.

    """
    _service = Service(ChromeDriverManager().install())
    options = webdriver.ChromeOptions()
    ## Test on mobile window size and resolution
    options.add_argument("--window-size=420,965")  # 412,915 + padding
    options.add_experimental_option(
        "mobileEmulation", {"deviceName": "Samsung Galaxy S20 Ultra"}
    )
    # Remove "Chrome is being controlled by automated test software"
    options.add_experimental_option("excludeSwitches", ["enable-automation"])

    # options.add_argument("--force-device-scale-factor=0.5")
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
    # driver.maximize_window()
    yield driver
    driver.quit()


def load_page(driver, url):
    """Load a webpage and wait for it to be fully loaded.

    Args:
        driver (webdriver.Chrome): Selenium WebDriver instance.
        url (str): The URL of the page to load.

    """
    driver.get(url)
    WebDriverWait(driver, 10).until(ec.presence_of_element_located((By.TAG_NAME, "body")))


def contains_text(element, expected: str) -> bool:
    """Check if a WebElement's text contains the expected substring.

    Args:
        element: The WebElement to check.
        expected (str): The substring to look for in the element's text.

    Returns:
        bool: True if the expected substring is found, False otherwise.

    """
    return expected in element.text

def take_screenshot(driver, path:Path) -> None:
    """Take a screenshot of the current browser window.

    Args:
        driver (webdriver.Chrome): Selenium WebDriver instance.
        path (Path): The file path where the screenshot will be saved.

    """
    driver.save_screenshot(path)

def get_cookie_banner(driver):
    """Locate and return the cookie banner element on Verkkokauppa.com.

    Args:
        driver (webdriver.Chrome): Selenium WebDriver instance.

    Returns:
        WebElement | None: The cookie banner accept button if found, None otherwise.

    """
    try:
        shadow_host = driver.find_element(By.ID, "usercentrics-cmp-ui")
        shadow_root = driver.execute_script("return arguments[0].shadowRoot", shadow_host)
        accept_button = shadow_root.find_element(By.CLASS_NAME, "uc-accept-button")
    except:
        return None
    else:
        return accept_button


def test_mainpage(driver) -> None:
    """Verify that Verkkokauppa.com homepage loads with the correct title.

    Args:
        driver (webdriver.Chrome): Selenium WebDriver fixture.

    """
    load_page(driver, "https://www.verkkokauppa.com")

    assert "Verkkokauppa.com" in driver.title, "Page title does not contain 'Verkkokauppa.com'"
    take_screenshot(driver, Path("img") / "test1_1.png")
    time.sleep(1)



def test_cookies(driver):
    """Verify that the cookie banner can be accepted and dismissed.

    Args:
        driver (webdriver.Chrome): Selenium WebDriver fixture.

    """
    load_page(driver, "https://www.verkkokauppa.com")

    cookie_banner = get_cookie_banner(driver)
    assert cookie_banner is not None, "Cookie banner not found"
    take_screenshot(driver, Path("img") / "test2_1.png")

    cookie_banner.click()
    time.sleep(1)

    cookie_banner = get_cookie_banner(driver)
    assert cookie_banner is None, "Cookie banner still present after accepting"
    take_screenshot(driver, Path("img") / "test2_2.png")
    time.sleep(1)


def test_search(driver):
    """Verify that the search functionality works correctly.

    Tests searching for 'peruna' and validates that search results are
    displayed with the correct URL and header text.

    Args:
        driver (webdriver.Chrome): Selenium WebDriver fixture.

    """
    load_page(driver, "https://www.verkkokauppa.com")

    cookie_banner = get_cookie_banner(driver)
    if cookie_banner:
        cookie_banner.click()
        time.sleep(1)

    search_input = WebDriverWait(driver, 5).until(ec.presence_of_element_located((By.ID, "combobox_input")))
    search_input.send_keys("peruna")
    search_input.submit()

    time.sleep(1)

    ## Perus testi
    assert driver.current_url.lower() == "https://www.verkkokauppa.com/fi/search?query=peruna", (
        "Search URL is incorrect"
    )

    # Tarkempi tarkistus, että hakutuloksia on näkyvissä
    header_text = WebDriverWait(driver, 5).until(ec.presence_of_element_located((By.TAG_NAME, "h1"))).text
    assert 'tulosta haulla "peruna"' in header_text.lower(), "Search results header does not contain expected text"
    take_screenshot(driver, Path("img") / "test3_1.png")
    time.sleep(1)


def test_search_sorting(driver):
    """Verify that search results can be sorted by price in ascending order.

    Tests that the product price changes after sorting and validates the
    price format before and after sorting.

    Args:
        driver (webdriver.Chrome): Selenium WebDriver fixture.

    """
    load_page(driver, "https://www.verkkokauppa.com/fi/search?query=peruna")

    cookie_banner = get_cookie_banner(driver)
    if cookie_banner:
        cookie_banner.click()
        time.sleep(1)

    wait = WebDriverWait(driver, 5)
    wait.until(lambda _: contains_text(driver.find_element(By.TAG_NAME, "h1"), 'tulosta haulla "peruna"'))
    tulos_teksti = driver.find_element(By.TAG_NAME, "h1").text
    assert 'tulosta haulla "peruna"' in tulos_teksti.lower(), "Search results header does not contain expected text"

    first_product = driver.find_elements(By.TAG_NAME, "article")[0]
    all_spans = first_product.find_elements(By.TAG_NAME, "span")
    unsorted_price = all_spans[-3]
    assert re.findall(r"\d+,\d{2}", unsorted_price.text), "Unsorted product price format is incorrect"
    take_screenshot(driver, Path("img") / "test4_1.png")

    sort_select = driver.find_element(By.ID, "sort_select")
    assert sort_select is not None, "Sort select element not found"
    sort_select.click()

    price_asc_option = driver.find_element(By.CSS_SELECTOR, "#sort_select option[value='price:asc']")
    assert price_asc_option is not None, "Price ascending sort option not found"
    price_asc_option.click()
    time.sleep(1)

    first_product = driver.find_elements(By.TAG_NAME, "article")[0]
    all_spans = first_product.find_elements(By.TAG_NAME, "span")
    sorted_price = all_spans[-3]
    assert re.findall(r"\d+,\d{2}", sorted_price.text), "Sorted product price format is incorrect"
    take_screenshot(driver, Path("img") / "test4_2.png")

    assert unsorted_price != sorted_price, "Product price did not change after sorting"
    time.sleep(1)


def test_produce_page(driver):
    """Verify navigation to a product page from search results.

    Tests clicking on the first product in search results and validates
    that the product page loads with rating information.

    Args:
        driver (webdriver.Chrome): Selenium WebDriver fixture.

    """
    load_page(driver, "https://www.verkkokauppa.com/fi/search?query=peruna")

    cookie_banner = get_cookie_banner(driver)
    if cookie_banner:
        cookie_banner.click()
        time.sleep(1)

    current_url = driver.current_url
    first_product = driver.find_elements(By.TAG_NAME, "article")[0]
    first_product.click()
    time.sleep(1)
    assert driver.current_url != current_url, "URL did not change after clicking the first product"

    rating = driver.find_element(By.XPATH, "//a[contains(@title, 'Lue arvostelut')]")
    assert rating is not None, "Rating element not found on product page"
    rating_text = rating.find_element(By.TAG_NAME, "span").text
    assert rating_text != "", "Rating text is empty on product page"
    take_screenshot(driver, Path("img") / "test5_1.png")
    time.sleep(1)


def test_product_cart(driver):
    """Verify adding a product to the shopping cart.

    Tests the complete flow of searching for a product, adding it to cart,
    and validating the cart item count updates correctly.

    Args:
        driver (webdriver.Chrome): Selenium WebDriver fixture.

    """
    load_page(driver, "https://www.verkkokauppa.com/fi/search?query=peruna")

    cookie_banner = get_cookie_banner(driver)
    if cookie_banner:
        cookie_banner.click()
        time.sleep(1)

    first_product = driver.find_elements(By.TAG_NAME, "article")[0]
    first_product.click()
    time.sleep(2)

    product_id = re.findall(r"\d+", driver.current_url)[0]
    add_to_cart = driver.find_element(By.XPATH, f"//button[contains(@data-id, '{product_id}')]")
    assert add_to_cart is not None, "Add to cart button not found on product page"
    add_to_cart.click()
    time.sleep(2)

    cart_button = driver.find_element(By.ID, "header-cart-button")
    span_elem = cart_button.find_element(By.XPATH, f".//span[@aria-label]")
    span_text: str = span_elem.text
    span_aria_label = span_elem.get_attribute("aria-label")
    assert span_text == "1", "Cart item count did not update to 1 after adding product to cart"
    assert span_aria_label == "Korissa yksi tuote", (
        "Cart aria-label did not update correctly after adding product to cart"
    )
    take_screenshot(driver, Path("img") / "test6_1.png")
    time.sleep(1)
