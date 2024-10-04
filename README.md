# PG-Management-System

Thanks for the clarification! Now that I have a better understanding of the actual needs, let’s redefine the flow to suit your mother's **existing PG** operations.

The goal is to create a **management system** that helps you:
- Track **existing tenants** (girls staying at your PG).
- Record **payment details** based on their joining date, rent, and other charges.
- Manage **additional services** like food (charged on consumption), electricity, and other utilities.

Let’s break this down further with a simpler and more tailored approach.

---

### 1. **Main Objective**
The system will primarily focus on managing **existing tenants** and automating key tasks like:
- Tracking **tenants' rent dues** and payments.
- Logging **additional charges** like food and utilities.
- Generating a **summary** at the end of the month for each tenant.

### 2. **Panels**
We’ll stick with the idea of two panels:
- **Admin Panel (for you and your mother)**: To manage tenants, payments, and charges.
- **Tenant Panel (for record keeping)**: This will be more of a profile section where you view individual tenant details (no login is required for them unless needed later).

---

### 3. **Features of the System**

#### A. **Admin Panel (Main Features)**
1. **Add/Manage Tenants**:
   - When a tenant (girl) moves in, you’ll register her in the system with the following details:
     - **Name**
     - **Phone Number** (in case you need to contact them)
     - **Date of Joining** (so the system can track rent based on the date)
     - **Room Number/Bed** (optional, if you want to track where each tenant stays)

2. **Payment Tracking**:
   - For each tenant, you’ll be able to track:
     - **Monthly Rent** (pre-defined or manually entered)
     - **Additional Charges** (food, electricity, etc.)
     - **Payment Status** (paid/unpaid, amount due)
   - Automatically calculate total charges based on rent and any added charges (like food or utilities).

3. **Food Tracking**:
   - You can record when food is provided to a tenant. This can be tracked by:
     - **Date** and **Meal Type** (e.g., breakfast, lunch, dinner).
     - **Charge per Meal** (fixed amount for each meal, which adds up at the end of the month).

4. **Utility Bills (Electricity, etc.)**:
   - Record additional charges like electricity, water, or other utilities. These can be:
     - **Distributed equally** among tenants.
     - **Added individually** for each tenant (e.g., if one room uses more electricity).

5. **Monthly Summary**:
   - Generate a **monthly summary** for each tenant, which includes:
     - **Base Rent**
     - **Food Charges** (based on meals taken)
     - **Utility Charges**
     - **Total Payment Due**

6. **Payment Record**:
   - You can mark payments as received and generate reports of pending dues.
   - This will make it easy to track who has paid and who hasn’t.

---

#### B. **Tenant Panel (Profile Section)**
This will be a simple read-only panel where you can view **tenant details**, such as:
- **Name**
- **Date of Joining**
- **Current Balance** (how much rent + extra charges are due)
- **Payment History** (optional, to track past payments).

Since this panel is mostly for **management purposes**, it doesn't need complex functionalities, but you can later add options for tenants to check their dues (if you want them to have login access).

---

### 4. **Features Breakdown by Tasks**

Let’s structure the tasks your system will help manage:

| **Task**                 | **Feature**                                           | **Flow**                                                                 |
|--------------------------|------------------------------------------------------|-------------------------------------------------------------------------|
| **Register a New Tenant** | Add a tenant profile (name, contact, date of joining) | Admin adds tenant info; system tracks rent from the joining date.       |
| **Manage Rent**           | Set monthly rent for each tenant                     | Rent is automatically tracked every month based on the joining date.    |
| **Track Food**            | Record when a tenant takes food                      | Add a log for each meal; the system calculates the total at month’s end.|
| **Handle Utilities**      | Add electricity or other shared costs                | Admin can add a total bill and split it among tenants.                  |
| **Generate Monthly Report**| View a summary of rent + additional charges          | Automatically calculated for each tenant with a total payable amount.   |
| **Record Payment**        | Mark payment as received                             | Admin marks rent and extra charges as paid; the system tracks balances. |

---

### 5. **Additional Features to Consider**
1. **Notifications/Reminders**: You could add a simple feature where you send SMS or WhatsApp reminders for rent or payments (optional).
   
2. **Recurring Rent Calculation**: Automatically calculate rent on the 1st of every month for each tenant. You only need to manage the extra charges (food, utilities).

3. **Expense Reports for You**: The system can generate **reports for the admin**, showing how much you’ve collected, outstanding dues, and expenses.

---

### 6. **Project Flow**
Here’s how the daily/monthly management could look in practice:

1. **Tenant Onboarding**:
   - Add each tenant’s information when they move in (name, date of joining, phone number).
   - Set the monthly rent.

2. **Daily Operations**:
   - Each day, when food is provided, add it to the system (which tenant took food, what meal, charge).
   - Add any utilities at the end of the month or as bills arrive.

3. **End of the Month**:
   - The system will automatically calculate the **total charges** for each tenant (rent + food + utilities).
   - You can view each tenant’s due amount and send reminders if needed.

4. **Payments**:
   - Once payment is received (either partial or full), you record it in the system. The tenant’s balance is updated.

---

### 7. **Flow Overview**
- **Tenant moves in** → Admin adds tenant details, rent starts accruing from the joining date.
- **Daily/Weekly** → Admin logs food consumption and utility costs.
- **End of the month** → System generates total due for each tenant (rent + food + utilities).
- **Payment received** → Admin marks payment, and balance updates.

---

### Key Considerations:
- **Simple UI**: The system should be easy for your mother to use without requiring any technical expertise. Recording food or payments should be quick.
  
- **Scalability**: While this is for your current PG, the system can be flexible enough to handle more tenants if needed in the future.

- **Manual Adjustments**: Allow manual updates for cases like rent discounts, partial payments, or unexpected charges.

---

### Next Steps

If this flow aligns with what you had in mind, we can discuss specific **data structures** (like what information goes into tenant profiles, charges, etc.) and then move into **coding**. Let me know if you want to modify or add anything to the flow before we move ahead!