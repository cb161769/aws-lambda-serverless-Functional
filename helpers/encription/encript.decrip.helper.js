const crypto = require('crypto');

const iterations = 4096;
const keylen = 32;
const randomDataSize = 16;

/*
	A crypto-based SHA-256 encryptor
	@param {String} text: a string to be encrypted,
	@param {String} password: the secret to be encrypted with,
	@param {String} salt: preferably random char sequence to be encrypted with;
	@returns {String} a string representaion of Base64-encoded encrypted string.
	Usage example:
	let text = 'string';
	let pwd = 'myPwd';
	let privateKey = 'secret';
	let encryptedString = encrypt(text, pwd, privateKey);
	let decryptedString = decrypt(encryptedString, pwd, privateKey);
	assert(decryptedString === text);
*/
module.exports.encrypt = (text, password, salt) => {
	let key = crypto.pbkdf2Sync(password, salt, iterations, keylen);
	let iv = crypto.randomBytes(randomDataSize);
	let c = crypto.createCipheriv('aes-256-cfb', key, iv);

	let buffers = [c.update(new Buffer(text)), c.final()];
	return Buffer.concat(buffers).toString('base64');
}

/*
	A crypto-based SHA-256 decryptor
	@param {String} encrypted: an encrypted string,
	@param {String} password: the secret used by encryption,
	@param {String} salt: preferably random char sequence used by encryption;
	@returns {String} the decrypted string.
	Usage example:
	let text = 'string';
	let pwd = 'myPwd';
	let privateKey = 'secret';
	let encryptedString = encrypt(text, pwd, privateKey);
	let decryptedString = decrypt(encryptedString, pwd, privateKey);
	assert(decryptedString === text);
*/
module.exports.decrypt = (encrypted, password, salt) => {
	let key = crypto.pbkdf2Sync(password, salt, iterations, keylen)
	let iv = crypto.randomBytes(randomDataSize);
	let c = crypto.createDecipheriv('aes-256-cfb', key, iv);

	let decrypted = c.update(new Buffer(encrypted, 'base64'));
	c.final();

	return decrypted.toString();
}