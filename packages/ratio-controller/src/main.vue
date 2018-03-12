
<template>
<div class="el-ratio-controller">
    <div class="el-ratio-controller__runway" ref="barWrap">
        <span class="el-ratio-controller__bar" :class="[{'bar-blue':ratio.percent>0},{'left-radius':index===0},{'right-radius':index===ratios.length-1},{'nodrag':ratio.percent===0}]" :style="{width:getWidth(ratio)+'px'}" :key="index"  v-for="(ratio,index) in ratios">
            <div class="el-ratio-controller__bar-tip" :class="{'nodrag':ratio.percent===0}">{{index+1}}</div>
            <div class="el-ratio-controller__bar-text" :class="[{'bartext-red':ratio.percent===0}]">{{ratio.percent}}%</div>
            <div v-if="ratio.desc&&ratio.desc!==''" class="el-ratio-controller__bar-desc">{{ ratio.desc }}</div>
        </span>
        
        <div class="el-ratio-controller__button-wrapper" 
            @mousedown="mousedown(index, $event)" 
            :style="{left:getLeft(index)+'px'}"
            v-for="(ratio,index) in ratios" 
            v-if="index<ratios.length-1"
            :class="{'nodrag':ratio.percent===0&&ratios[index+1].percent===0}"
            :key="index">
        </div>
    </div>
</div>
</template>

<script>
    const zeroWidth = 22;
    export default {
        name: 'ElRatioController',
        props: {
            step: {
                type: Number,
                default: 10
            },
            value: {
                type: Array,
                default: []
            },
            disabled: {
                type: Boolean,
                default: false
            },
            ratios:{
                type: Array,
                default: []
            }
            //可以在ratios里增加一个minRatio作为每一个按钮的最小值设置
        },
        watch: {
            ratios: {
                deep: true,
                handler(val) {

                    var tmp = [];
                    val.forEach(function(p) {
                        tmp.push(p.percent)
                    })
                    if(tmp.toString()!==this.value.toString()) {
                        this.$emit('input', tmp)
                    }
                    

                }
                
            },
            value: {
                deep: true,
                handler(val) {
                    // var tmp = [];
                    var that = this;
                    val.forEach(function(p,index) {
                        that.ratios[index].percent = p;
                    })
                }
            }
        },
        // computed: {
        //     currentValue: {
        //         get:function() {
        //             return this.value;
        //         },
        //         set:function(val) {
        //             //console.log('in')
        //             this.$emit('change', val);
        //         }
        //     }
        // },
        data(){
            return {
                barWrapWidth:0,
                moveBarIndex:null,
                sliderSize: 1,
                startX: 0,
                barLeft: 0,
                oldSliderSize: this.sliderSize
            }
        },
        mounted() {
        },
        methods:{
            resetSize() {
                if(this.$refs.barWrap) {
                    this.sliderSize = this.$refs.barWrap.offsetWidth||this.$refs.barWrap.clientWidth||this.oldSliderSize;
                }
            },
            onDragEnd(event){
                window.removeEventListener('mousemove', this.onDragging);
                window.removeEventListener('mouseup', this.onDragEnd);
            },
            mousedown(index,event){
                this.moveBarIndex = index;
                this.startX = event.clientX;
                this.barLeft = event.clientX - this.getLeft(index);
                window.addEventListener('mousemove', this.onDragging);
                window.addEventListener('mouseup', this.onDragEnd);
            },
            onDragging(event){
                var that = this;
                if(that.moveBarIndex!==null) {
                    var getOffsetLeft =
                        function(obj){
                            var tmp = obj.offsetLeft;
                            var val = obj.offsetParent;
                            while(val != null){
                                if(tmp!=val.offsetLeft) {
                                    tmp += val.offsetLeft;
                                val = val.offsetParent;
                                    
                                }
                                
                            }
                            return tmp;
                        }
                        // var offsetLeft = getOffsetLeft(that.$refs.barWrap);
                        // var offsetLeft = $(this.$refs.barWrap).offset().left;
                        // //console.log(offsetLeft);
                    // let diff = event.clientX-323-that.getLeft(that.moveBarIndex);
                    // let diff = event.clientX - that.startX;
                    function getOffsetLeftByBody(el) {
                        let offsetLeft = 0
                        while (el && el.tagName !== 'BODY') {
                            offsetLeft += el.offsetLeft
                            el = el.offsetParent
                        }
                        return offsetLeft
                    }
                    var offsetLeft = getOffsetLeftByBody(that.$refs.barWrap);
                    
                    let diff = event.clientX-that.barLeft-that.getLeft(that.moveBarIndex);

                    //runway距浏览器左侧距离需要计算正确
                    // //console.log(diff,'----------',event.clientX, that.startX);
                    // 不能超过左右边界
                    const left = that.moveBarIndex===0?0:that.getLeft(that.moveBarIndex-1);
                    const current = that.getLeft(that.moveBarIndex)
                    const right = that.getLeft(that.moveBarIndex+1)
                    // const right = 400;

                    // //console.log(left,right,current,diff,'JJJJJJJJJJ')
                    //这里return条件判断有误，因为一次性直接超出了右边界，导致拖不过去，return了
                    // if(diff>(right-current)||diff<(left-current)){
                    //     //console.log('return------')
                    //     return;
                    //     // diff = diff > 0 ? right - current : left - current; 
                    // }
                     if(diff>(right-current)){
                        diff = (right-current);
                    }   else if(diff<(left-current)){
                        diff = (left-current);
                    } 
         

                    if(Math.abs(diff)>that.$refs.barWrap.offsetWidth*0.05&&Math.floor(Math.abs(diff))>zeroWidth){
                        let flag;
                        if(diff>0){
                            flag = 1
                        }else{
                            flag = -1
                        }
                        that.ratios[that.moveBarIndex].percent+=10*flag;
                        
                        if(that.moveBarIndex < that.ratios.length-1) {
                            that.ratios[that.moveBarIndex+1].percent+=10*flag*-1;
                        }
                    }
                }
            },
            getWidth(ratio){
                let width = this.sliderSize;
              
                if(!ratio.percent){
                    return zeroWidth;
                }
                // if(!ratio.percent){
                //     return zeroWidth/this.sliderSize*100;
                // }
                this.ratios.forEach(function (ratio) {
                    if(ratio.percent===0){
                        width-=zeroWidth;
                    }
                });
               
                return ratio.percent/100*width;
                
                // return ratio.percent*width/this.sliderSize;
            },
            
            getLeft(index){
                let width = this.sliderSize;
                this.ratios.forEach(function (ratio) {
                    if(ratio.percent===0){
                        width-=zeroWidth;
                    }
                });
                if(index===0){
                    if(this.ratios[index].percent===0) return zeroWidth;
                    return this.ratios[index].percent*(width/100);
                }else{
                    
                    if(this.ratios[index].percent===0) return zeroWidth+this.getLeft(index-1);
                    return this.ratios[index].percent*(width/100)+this.getLeft(index-1)
                }
            }
        },
        mounted(){
           
            const that = this;
            // //console.log(this);

            // window.addEventListener("mousemove",function (event) {
            //     //处理鼠标移动
            //     //console.log('move');
            //     if(that.moveBarIndex!==null){
            //         let diff = event.clientX-that.getLeft(that.moveBarIndex);

            //         // 不能超过左右边界
            //         const left = that.moveBarIndex===0?0:that.getLeft(that.moveBarIndex-1);
            //         const right = that.moveBarIndex===that.ratios.length-1 ? 100 : that.getLeft(that.moveBarIndex+1)
            //         const current = that.getLeft(that.moveBarIndex)

            //         if(diff>(right-current)||diff<(left-current)){
            //             return;
            //         }

            //         if(Math.abs(diff)>that.$refs.barWrap.offsetWidth*0.05){
            //             let flag;
            //             if(diff>0){
            //                 flag = 1
            //             }else{
            //                 flag = -1
            //             }
            //             that.ratios[that.moveBarIndex].percent+=10*flag;
            //             if(that.moveBarIndex < that.ratios.length-1) {
            //                 that.ratios[that.moveBarIndex+1].percent+=10*flag*-1;
            //             }
            //         }
            //     }
            // });

            // window.addEventListener("mouseup",function () {
            //     //处理鼠标移动
            //     that.moveBarIndex = null;
            //     // window.removeEventListener('mousemove');
            //     // window.removeEventListener('mouseup');
            // });
            // this.sliderSize = this.$refs.barWrap.offsetWidth||this.$refs.barWrap['clientWidth'];
            

            that.resetSize();
            that.oldSliderSize = that.sliderSize;
            window.addEventListener('resize', that.resetSize);
        }
    }
</script>
<style>
.el-dialog__body {
    padding: 40px 100px 30px;
}

.bar-blue {
    background: #0AA9F1;
}
.bartext-red {
    color: #F77181;
}
.left-radius {
    border-top-left-radius: 43px;
    border-bottom-left-radius: 43px;
}
.right-radius {
    border-top-right-radius: 43px;
    border-bottom-right-radius: 43px;
}
</style>

