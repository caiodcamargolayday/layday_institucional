# Cloudbeds Tracking via Google Tag Manager (GTM)
## Complete Guide: Lay Day Gili T (Property Code: `4fbPDV`)

Because Cloudbeds has deprecated native Meta (Facebook) Pixel integration, all tracking (Meta Pixel `PageView`, `InitiateCheckout`, `Purchase`, and Google Ads conversions) must run through **Google Tag Manager (GTM)** embedded into the Cloudbeds Booking Engine.

---

### Key Credentials for Lay Day Gili T
- **GTM Container Public ID:** `GTM-WZKVRS2X`
- **GTM Workspace URL:** [Google Tag Manager Workspace](https://tagmanager.google.com/#/container/accounts/6370441690/containers/260702267/workspaces/7)
- **Meta (Facebook) Pixel ID:** `1264553262088469`
- **Google Ads Conversion ID:** `18224532346` / Label: `755lCLj-y9YcEPqWkfJD`
- **Cloudbeds Booking Engine URL:** `https://hotels.cloudbeds.com/en/reservation/4fbPDV`

---

## Part 1: Put GTM Container ID in Cloudbeds (1 Minute)

1. Log in to your **Cloudbeds PMS** account (`hotels.cloudbeds.com`).
2. Click on the **Settings (Gear Icon)** in the top right.
3. In the left navigation, navigate to **Booking Engine** > **Analytics**.
4. Find the **Google Tag Manager** section (or **GTM Connection**).
5. Enter the GTM Container ID:
   ```
   GTM-WZKVRS2X
   ```
6. Click **Save** at the bottom of the page.

> Cloudbeds will now automatically load your GTM container on every step of your booking engine (`hotels.cloudbeds.com/en/reservation/4fbPDV`).

---

## Part 2: Configure GTM (Option A: 1-Click Import - Recommended)

We have generated the complete GTM container export file ready to import:
[`docs/gtm/GTM_Lay_Day_Gili_T_Cloudbeds_Setup.json`](file:///Users/lenovo/Desktop/DIGITAL%20MARKETING/02_RARITY%20GROUP/RARITY%20AGENCY/CLIENTS/CURRENT%20CLIENTS/LAYDAY%20HOSTEL%20BALI/layday_institucional-main/docs/gtm/GTM_Lay_Day_Gili_T_Cloudbeds_Setup.json)

1. Go to your GTM Container:
   [https://tagmanager.google.com/#/container/accounts/6370441690/containers/260702267/workspaces/7](https://tagmanager.google.com/#/container/accounts/6370441690/containers/260702267/workspaces/7)
2. Click **Admin** (top navigation tab).
3. Under the **Container** column (right side), click **Import Container**.
4. Click **Choose container file** and select:
   `docs/gtm/GTM_Lay_Day_Gili_T_Cloudbeds_Setup.json`
5. Under **Choose workspace**, select **Existing** > choose workspace **Default / Workspace 7**.
6. Under **Choose an import option**, select **Merge** > **Overwrite conflicting tags, triggers, and variables**.
7. Review the import preview and click **Confirm**.
8. Click the blue **Submit** button in the top right of GTM > click **Publish**!

---

## Part 3: Configure GTM (Option B: Manual Setup)

If you prefer adding the tags manually in GTM, follow these exact steps:

### 1. Variables (Data Layer Variables)
Go to **Variables** > **User-Defined Variables** > **New**:

1. **`dlv - ecommerce.value`**
   - Type: *Data Layer Variable*
   - Data Layer Variable Name: `ecommerce.value`
   - Data Layer Version: *Version 2*
   - Default Value: `0`

2. **`dlv - ecommerce.currency`**
   - Type: *Data Layer Variable*
   - Data Layer Variable Name: `ecommerce.currency`
   - Default Value: `IDR`

3. **`dlv - ecommerce.transaction_id`**
   - Type: *Data Layer Variable*
   - Data Layer Variable Name: `ecommerce.transaction_id`

4. **`dlv - transactionTotal`**
   - Type: *Data Layer Variable*
   - Data Layer Variable Name: `transactionTotal`

5. **`dlv - reservationId`**
   - Type: *Data Layer Variable*
   - Data Layer Variable Name: `reservationId`

---

### 2. Triggers
Go to **Triggers** > **New**:

1. **`Event - Purchase or Booking Confirmed`**
   - Trigger Type: *Custom Event*
   - Event name: `^(purchase|booking_confirmed|reservation_confirmed|booking_complete|cloudbeds_reservation_confirm)$`
   - Check: **Use regex matching**

---

### 3. Tags
Go to **Tags** > **New**:

#### Tag 1: Conversion Linker - Cross Domain
- **Tag Type**: *Conversion Linker*
- Check **Enable linking across domains**:
  - `laydayhostels.com`
  - `laydayhostel.com`
  - `hotels.cloudbeds.com`
  - `cloudbeds.com`
- Check **Enable linking on all URLs**
- **Trigger**: *All Pages*

#### Tag 2: Meta Pixel - Base Code & PageView
- **Tag Type**: *Custom HTML*
- **HTML**:
  ```html
  <script>
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '1264553262088469');
    fbq('track', 'PageView');
  </script>
  <noscript>
    <img height="1" width="1" style="display:none" 
         src="https://www.facebook.com/tr?id=1264553262088469&ev=PageView&noscript=1"/>
  </noscript>
  ```
- **Trigger**: *All Pages*

#### Tag 3: Meta Pixel - InitiateCheckout (Cloudbeds)
- **Tag Type**: *Custom HTML*
- **HTML**:
  ```html
  <script>
  (function() {
    if (window.fbq && location.hostname.indexOf('cloudbeds') > -1) {
      var isConfirmation = location.pathname.indexOf('confirm') > -1 || location.search.indexOf('reservation_id') > -1;
      if (!isConfirmation) {
        fbq('track', 'InitiateCheckout', {
          content_name: 'Lay Day Gili T',
          currency: 'IDR'
        });
      }
    }
  })();
  </script>
  ```
- **Trigger**: *All Pages*

#### Tag 4: Meta Pixel - Purchase Conversion
- **Tag Type**: *Custom HTML*
- **HTML**:
  ```html
  <script>
  (function() {
    var rawVal = {{dlv - ecommerce.value}} || {{dlv - transactionTotal}} || 0;
    var cur = {{dlv - ecommerce.currency}} || 'IDR';
    var txId = {{dlv - ecommerce.transaction_id}} || {{dlv - reservationId}} || '';
    
    var numVal = 0;
    if (typeof rawVal === 'number') {
      numVal = rawVal;
    } else if (typeof rawVal === 'string') {
      numVal = parseFloat(rawVal.replace(/[^0-9.]/g, '')) || 0;
    }

    if (window.fbq) {
      fbq('track', 'Purchase', {
        value: numVal,
        currency: cur,
        content_name: 'Lay Day Gili T Booking',
        content_type: 'product',
        order_id: String(txId)
      }, {
        eventID: txId ? 'cb_' + txId : undefined
      });
    }
  })();
  </script>
  ```
- **Trigger**: `Event - Purchase or Booking Confirmed`

#### Tag 5: Google Ads - Booking Purchase Conversion
- **Tag Type**: *Google Ads Conversion Tracking*
- **Conversion ID**: `18224532346`
- **Conversion Label**: `755lCLj-y9YcEPqWkfJD`
- **Conversion Value**: `{{dlv - ecommerce.value}}`
- **Transaction ID**: `{{dlv - ecommerce.transaction_id}}`
- **Currency Code**: `{{dlv - ecommerce.currency}}`
- **Trigger**: `Event - Purchase or Booking Confirmed`

---

## Part 4: How to Test & Verify

1. Open GTM and click **Preview** in the top right.
2. Enter your Cloudbeds Booking Engine URL:
   `https://hotels.cloudbeds.com/en/reservation/4fbPDV`
3. In the new window with Tag Assistant connected:
   - Check that **Meta Pixel - Base Code & PageView** fires.
   - Check that **Meta Pixel - InitiateCheckout** fires.
4. Open the **Meta Pixel Helper** Chrome extension on the Cloudbeds page:
   - It should show green checkmarks for **PageView** and **InitiateCheckout** under Pixel ID `1264553262088469`.
5. Complete a test booking (or test reservation):
   - On the confirmation step, verify that **Meta Pixel - Purchase** and **Google Ads - Booking Purchase Conversion** fire with the reservation total and transaction ID.
