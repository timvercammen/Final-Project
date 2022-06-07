//opkuisen van mysql RowDataPacket naar gewone js objecten
//want enkel gewone js objecten kan je via props doorgeven naar de FRONTEND

export const parse = (mysqlData) => JSON.parse(JSON.stringify(mysqlData));
