> [!IMPORTANT]
> Project นี้ไม่ผ่านการทดสอบแล้ว จึงทำการเปลี่ยน database จาก SQLite เป็น Postgres เพื่อ deploy ต่อไป

# Datawow assignment - Backend - NestJS

## ภาพรวม

NestJS + TypeScript

ไม่มีการทำ git flow เนื่องจากเป็น assignment ครับ

### Libraries

- Prisma - ORM for query data from database
- GraphQL - fetch and mutate data between backend and frontend
- PassportJS - handle authentication with express-session

### Structure

เป็นไปตาม default ของ NestJS ในรูปแบบ MVC โดยไฟล์ `*.resolver.ts` เป็น controller สำหรับ routing ของ GraphQL และแยกตาม model ของ Prisma database schema

## ขั้นตอนการติดตั้ง

### Requirements

- `NodeJS` v18 ขึ้นไป (LTS)
- `NPM` for Package Manager

### การติดตั้ง

1. ลง dependencies ของโปรเจ็คนี้

```bash
npm install
```

2. สร้างไฟล์ `.env` ในโปรเจ็ค โดยสามารถคัดลอกได้จากไฟล์ `.env.example`

3. ทำการ migrate database ด้วยคำสั่ง

```bash
npm run prisma:migrate
```

> [!NOTE]
> ขั้นตอนนี้ทำเฉพาะเปิดโปรเจ็คครั้งแรกเท่านั้น

> [!TIP]
> หาก database ไม่มีข้อมูล community หลักจากการ migration
> สามารถใช้คำสั่ง `npm run prisma:seed` เพื่อลงข้อมูลได้

4. รันโปรเจ็ค

```bash
npm run start:dev
```

หรือ

```bash
npm run start
```

> เนื่องจากการส่งงานเป็น repository จึงไม่ได้ build project แล้วรันคำสั่งของ production ได้

5. หากต้องการทดสอบ API ให้ไปที่ http://localhost:3001/graphql เพื่อใช้งาน GraphQL

## Run tests

ผมเพิ่งได้ศึกษาทดลองทำ unit test ครั้งแรกครับ หากผิดพลาดประการใด สามารถชี้แนะได้เลยนะครับ

```bash
# unit tests
$ npm run test
```

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
