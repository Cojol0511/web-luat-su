const HinhSu = { Id: "00", Name: "Hình Sự" }
const DanSu = {  Id: "01", Name: "Dân Sự" }
const KDTM = { Id: "02", Name: "KDTM" }
const HNGD = { Id: "03", Name :"HNGD" }

module.exports = {
    API_ADMIN: 'admin',
    API_GUEST: 'client',
    API_LAWYER:'lawyer',
    CATEGORIES: {
        HinhSu,
        DanSu,
        KDTM,
        HNGD
    },
    CATEGORY_MAPPER: new Map([
        [ HinhSu.Id, HinhSu.Name],
        [ DanSu.Id, DanSu.Name],
        [ KDTM.Id, KDTM.Name],
        [ HNGD.Id, HNGD.Name],
    ])
}