/**
 * Created by Wandergis on 2015/7/8.
 * 提供了百度坐标（BD09）、国测局坐标（火星坐标，GCJ02）、和WGS84坐标系之间的转换
 */
module.exports = {
    // methods: {

        out_of_china(lng, lat) {
            return (lng < 72.004 || lng > 137.8347) || ((lat < 0.8293 || lat > 55.8271) || false);
        },

        transformlat(lng, lat) {
            //定义一些常量
            var x_PI = 3.14159265358979324 * 3000.0 / 180.0;
            var PI = 3.1415926535897932384626;
            var a = 6378245.0;
            var ee = 0.00669342162296594323;
            var ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng));
            ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
            ret += (20.0 * Math.sin(lat * PI) + 40.0 * Math.sin(lat / 3.0 * PI)) * 2.0 / 3.0;
            ret += (160.0 * Math.sin(lat / 12.0 * PI) + 320 * Math.sin(lat * PI / 30.0)) * 2.0 / 3.0;
            return ret
        },

        transformlng(lng, lat) {
            //定义一些常量
            var x_PI = 3.14159265358979324 * 3000.0 / 180.0;
            var PI = 3.1415926535897932384626;
            var a = 6378245.0;
            var ee = 0.00669342162296594323;
            var ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng));
            ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
            ret += (20.0 * Math.sin(lng * PI) + 40.0 * Math.sin(lng / 3.0 * PI)) * 2.0 / 3.0;
            ret += (150.0 * Math.sin(lng / 12.0 * PI) + 300.0 * Math.sin(lng / 30.0 * PI)) * 2.0 / 3.0;
            return ret
        },

        gcj02towgs84(lng, lat) {
            //定义一些常量
            var x_PI = 3.14159265358979324 * 3000.0 / 180.0;
            var PI = 3.1415926535897932384626;
            var a = 6378245.0;
            var ee = 0.00669342162296594323;
            if (this.out_of_china(lng, lat)) {
                return [lng, lat]
            } else {
                var dlat = this.transformlat(lng - 105.0, lat - 35.0);
                var dlng = this.transformlng(lng - 105.0, lat - 35.0);
                var radlat = lat / 180.0 * PI;
                var magic = Math.sin(radlat);
                magic = 1 - ee * magic * magic;
                var sqrtmagic = Math.sqrt(magic);
                dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI);
                dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI);
                var mglat = lat + dlat;
                var mglng = lng + dlng;
                return [lng * 2 - mglng, lat * 2 - mglat]
            }
        },

        gcj02tobd09(lng, lat) {
            var x_PI = 3.14159265358979324 * 3000.0 / 180.0;
            var PI = 3.1415926535897932384626;
            var a = 6378245.0;
            var ee = 0.00669342162296594323;
            var z = Math.sqrt(lng * lng + lat * lat) + 0.00002 * Math.sin(lat * x_PI);
            var theta = Math.atan2(lat, lng) + 0.000003 * Math.cos(lng * x_PI);
            var bd_lng = z * Math.cos(theta) + 0.0065 - 0.00165;
            var bd_lat = z * Math.sin(theta) + 0.006 - 0.00333;
            return [bd_lng, bd_lat]
        }
    // }
}