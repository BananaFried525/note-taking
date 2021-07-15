# Note Taking

### รายละเอียดของ application ประกอบไปด้วย 3 API

**1. POST /api/note/create**
**API** ที่ใช้ในการสร้าง Note ขึ้นมาโดยส่งด้วย method **POST** และแนบมาพร้อมกับ **body** ดังนี้

```
{
    "title":"...",      //-> String **require**
    "content":"...",    //-> String **require**
    "tags":["..",".."]  //-> String[]
}
```

โดยในส่วนของ **id** และ **createAt** ทางหลังบ้านจะทำการจัดการสร้างและบันทึกลงฐานข้อมูลอัตโนมัติ
เมื่อต้องการจะสร้างโน๊ตขึ้นมาให้ทำการยิง request โดยใช้ method POST ไปยัง URL: localhost:8081/api/note/create
และทำการแนบ body ข้างต้นไปด้วย เมื่อทำการสร้างเรียบร้อยระบบจะตอบกลับด้วย http status code: 200 และข้อความดังนี้

```
{
    "message":  "success",
    "data":  {}
}
```

**2. GET /api/note/detail?id=$id**
เมื่อต้องการจะเรียกดูรายละเอียดของโน๊ตแต่ละโน๊ตให้ request GET ไปยัง URL: localhost:8081/api/note/detail?id=$id โดยที่ $id จะแทนด้วย id ของแต่ละโน๊ตที่ต้องการเรียกดู(ต้องลง id มาเสมอ) เมื่อระบบตอบกลับมาจะได้ http status code: 200 พร้อมกับข้อมูลดังตัวอย่าง

```
{
    "message":  "success",
    "data":  {
        "id":  "...",
        "title":  "...",
        "content":  "...",
        "createAt":  "...",
        "tags":  [
            "..",
            ".."
        ]
    }
}
```

**3. GET /api/note/list?filter=$title or $createAt**
เมื่อต้องการจะเรียกดูรายละเอียดของโน๊ตแต่ละโน๊ตให้ request GET ไปยัง URL: localhost:8081/api/note/list?filter=$title or $createAt โดยสามารถเรียงลำดับก่อนหลังได้ด้วย field title หรือ creatAt (ไม่จำเป็นต้องส่ง filter มาทุกครั้ง)
* ถ้า filter=title จะเรียงลำดับตามตัวอักษรจากตัวใหญ่ไปตัวเล็กตามรหัส ascii
* ถ้า filter=creatAt จะเรียงลำดับวันที่สร้างจากใหม่ไปเก่า
ซึ่งจะได้ผลลัพธ์เป็น http status code: 200 พร้อมกับข้อมูลดังตัวอย่าง
```
{
    "message":  "success",
    "data":  [
        {
            "id": "...",
            "title": "...",
            "content": "...",
            "createAt": "...",
            "tags": [
                "..",
                ".."
            ]
        },
        {...}
    ]
}
```

### ขั้นตอนการติดตั้ง
ให้ clone project นี้ไปแล้วพิมพ์คำสั่ง docker-compose up --build โดย server และ database จะทำการ run ผ่าน Docker ซึ่งจะ expose ผ่าน port 8081
Example: localhost:8081/api/note/list


