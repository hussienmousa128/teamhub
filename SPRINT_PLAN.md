#Current step: 0.1.2
0) Git + تنظيم

0.1 Repo

0.1.1 Create repo ✅

0.1.2 Add SPRINT_PLAN.md

0.1.3 Add README.md بسيط (سطرين عن المشروع)

0.2 أسلوب شغل

0.2.1 كل كومّيت يبدأ برقم الخطوة: 3.5.2 ...

0.2.2 كل خطوة = كومّيت صغير

1) إنشاء Angular داخل الريبو

1.1 Scaffold

1.1.1 Clone repo محليًا

1.1.2 أنشئ Angular workspace داخل نفس المجلد (بدون git جديد) باستخدام:

ng new teamhub --directory . --skip-git --routing --style=scss

خيار --directory و --skip-git موجودين رسميًا بالـ Angular CLI. 
Angular

1.1.3 شغّل المشروع (ng serve) وتأكد الصفحة فتحت

1.2 Push

1.2.1 Commit: 1.1.x init angular app

1.2.2 Push على GitHub

2) هيكلة “شركة”

2.1 folders

2.1.1 core/ (auth, interceptors, api)

2.1.2 shared/ (loader, error-box)

2.1.3 features/ (auth, users, me)

2.2 config

2.2.1 API_BASE_URL = https://dummyjson.com

2.2.2 تعريف conventions (وين نحط models/services/components)

3) Auth + Token + Storage

3.1 endpoints (DummyJSON)

3.1.1 Login: POST /auth/login (يرجع accessToken/refreshToken). 
DummyJSON

3.1.2 Me: GET /auth/me (Bearer token). 
DummyJSON

3.1.3 Refresh: POST /auth/refresh. 
DummyJSON

3.2 storage

3.2.1 حفظ accessToken + refreshToken بـ LocalStorage

3.2.2 تعريف “loggedIn = عندي accessToken”

3.3 interceptor + 401

3.3.1 إضافة Authorization header تلقائيًا

3.3.2 إذا 401 → refresh مرة → إعادة الطلب → إذا فشل logout

3.4 login page + guard

3.4.1 صفحة Login + validation

3.4.2 Guard يمنع /app/** بدون token

3.4.3 Logout

4) Users List (Pagination + Search)

4.1 endpoints

4.1.1 Get users: GET /users?limit&skip (pagination). 
DummyJSON

4.1.2 Search: GET /users/search?q=... 
DummyJSON

4.2 UI states

4.2.1 loading / empty / error

4.2.2 table + pagination + search (debounce)

5) User Details

5.1.1 GET /users/:id 
DummyJSON

5.1.2 loading/error/notfound

6) My Profile + Edit/Save

6.1.1 جلب /auth/me 
DummyJSON

6.2.1 فورم تعديل + validation

6.3.1 Save عبر PUT/PATCH /users/:id (محاكاة تحديث). 
DummyJSON

7) تسليم

7.1.1 توحيد رسائل النجاح/الفشل

7.2.1 README: تشغيل + حساب تجريبي + features
