  # Next.js admin Application (v15.5.5)

This repository contains a **Next.js v15.5.5** frontend application
built with a modern, scalable architecture.\
It integrates **NextAuth**, **React Query**, **React Hook Form**,
**Zod**, **Zustand**, **Framer Motion**, **TanStack Table**, **ShadCN
UI**, and **Tailwind CSS**.

---

## 🚀 Tech Stack

### **Framework & Core**

- **Next.js 15.5.5**
- **TypeScript**
- **App Router** architecture

### **Authentication**

- **NextAuth.js**

### **Data Fetching & State**

- **React Query (@tanstack/react-query)**\
- **Zustand** (for client‑side state management)

### **Forms & Validation**

- **React Hook Form**
- **Zod** (schema validation)
- Custom hooks:
  - `useZodForm`
  - `useZodFormV2`

### **UI & Animations**

- **ShadCN UI**\
- **Tailwind CSS**
- **Framer Motion**

### **Tables**

- **TanStack React Table (v8)**

---

# 📂 Project Architecture

    src/
     ├─ api/                     # API call functions (axios)
     │   ├─ deposit.ts
     │   ├─ withdraw.ts
     │   └─ utils.ts
     │
     ├─ hooks/
     │   ├─ useDeposit.ts       # Deposit logic (mutation + queries + validation)
     │   ├─ useDepositeHistory.ts
     │   ├─ useDeleteDeposit.ts
     │   ├─ useMutation.ts       # React-query mutation wrapper
     │   ├─ useQueryData.ts      # React-query fetch wrapper
     │   └─ useZodForm.ts        # Zod + React Hook Form integration
     │
     ├─ components/
     │   ├─ forms/
     │   │     ├─ depositForm.tsx
     │   │     └─ withdrawForm.tsx
     │   │
     │   ├─ tables/
     │   │   ├─ deposit/
     │   │   │    ├─ columns.ts
     │   │   │    ├─ depositListing.tsx
     │   │   │
     │   │   └─ withdraw/
     │   │        ├─ columns.ts
     │   │        ├─ withdrawListing.tsx
     │   │
     │   └─ ui/ (shadcn components)
     │
     ├─ schema/
     │   ├─ funds/
     │   │    └─ deposit.schema.ts
     │
     └─ types/
         └─ api.response.ts

---

# 🎯 How the Architecture Works

### **API Functions**

All backend API requests live in the **`/api`** folder.

Example:

```ts
export const deposit = (payload, token) =>
  axios.post("/deposit", payload, { headers: { Authorization: token } });
```

---

### **Hooks Layer (Main Business Logic)**

Every feature has its own dedicated hook.\
Example for deposit:

### ✔ `useDeposit()`

- Handles:
  - deposit API mutations\
  - Zod validation\
  - react-hook-form form state\
  - API-driven dropdown options\
  - currency exchange rate logic\
  - error handling\
  - success toast\
- Resets the form on success\
- Fetches prices, payment methods, currencies

### ✔ `useDepositeHistory()`

- Wraps a React-Query GET request\
- Formats response for tables

### ✔ `useDeleteDeposit()`

- Deletes deposit entry\
- Automatically refreshes React Query cache

---

# 📝 Custom Utility Hooks

### 🔸 `useMutationData()`

A wrapper over `useMutation()`: - Shows success/error toast\

- Invalidates related queries\
- Handles error normalization

### 🔸 `useQueryData()`

A wrapper over `useQuery()`: - Handles refetchInterval\

- Returns `isPending`, `isFetching`, etc.

### 🔸 `useZodForm()` / `useZodFormV2()`

Handles: - Schema validation (Zod) - React Hook Form resolver -
Submission error toasts

---

# 📄 Table Architecture

All tables follow this pattern:

    components/
     └─ tables/
         └─ deposit/
              ├─ columns.ts           # table column definitions
              └─ depositListing.tsx   # table UI + actions

### Example column definition:

```ts
export const columns: ColumnDef<TDepositHistoryApiResponse>[] = [
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <Badge>{row.original.status}</Badge>
  }
]
```

---

# 📄 Form Architecture

Forms follow the same pattern:

    components/forms/
     └─ depositForm.tsx
     └─ withdrawForm.tsx

Each form: - Uses **React Hook Form** - Uses **Zod schema validation** -
Uses its corresponding hook (`useDeposit()`) - Supports file uploads,
dropdowns, real‑time currency conversions

---

# 🛠 Development

### Install dependencies

```sh
npm install
```

### Run dev server

```sh
npm run dev
```

### Build

```sh
npm run build
```

---

# 🙌 Summary

This repo uses a clean, scalable architecture that separates: - API
logic\

- Hooks (business logic)\
- UI components\
- Form and table system\
- React Query data layer\
- Validation via Zod

It allows the project to stay **modular**, **testable**, and **easy to
extend**.

---

# 📥 Download

This README is now available as `README.md` in the files section below.
,
