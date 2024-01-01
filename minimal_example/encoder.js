// use the GIFEncoder more so as an array of images until ready to encode all at once
class Encoder {
    constructor(encoder = new GIFEncoder(), repeat = 0, delay = 500, frames = []) {
        this.gif_encoder = encoder
        this.repeat = repeat
        this.delay = delay
        this.frames = frames
        this.encodedFlag = false
    }
    setRepeat(repeat = this.repeat) {
        this.gif_encoder.setRepeat(repeat); //0  -> loop forever
        //1+ -> loop n times then stop
    }
    setDelay(delay = this.delay) {
        this.gif_encoder.setDelay(delay); //go to next frame every n milliseconds
    }
    encode() {
        this.gif_encoder.start()
        for (let i = 0; i < this.frames.length; i++) {
            this.gif_encoder.addFrame(this.frames[i])
        }
        this.gif_encoder.finish()
        this.encodedFlag = true
        return this.getDataUrl()
    }
    getDataUrl() {
        const binary_gif = this.gif_encoder.stream().getData() //notice this is different from the as3gif package!
        try {
            const data_url = 'data:image/gif;base64,'+encode64(binary_gif);
            return data_url
        } catch {
            consle.warn("encoder.js: unable to encode data_url")
            return null
        }
    }
    download() {
        if (!this.encodedFlag) this.encode()
        this.gif_encoder.download()
    }
    // array utility methods for frames
    addFrame(ctx) {
        this.frames.push(ctx)
    }
    spliceFrames(index, deleteCount) {
        this.frames.splice(index, deleteCount)
    }
    getFrame(index) {
        if (index < this.frames.index) {
            return this.frames[index]
        }
    }
}
