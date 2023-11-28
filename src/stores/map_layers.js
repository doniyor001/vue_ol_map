import { defineStore } from 'pinia'

export const useMapStore = defineStore('counter',{
    state:() => {
        return {
            background_layers: [
                {
                    name: 'Open Street Map',
                    url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
                },
                {
                    name: 'ArcGis World Imagery',
                    url: 'https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
                },
                {
                    name: 'ArcGis World Street',
                    url: 'https://services.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}'
                },
                {
                    name: 'ArcGis World Topo',
                    url: 'https://services.arcgisonline.com/arcgis/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}'
                },
                {
                    name: 'Google Street Map',
                    url: 'https://mt1.google.com/vt/lyrs=r&z={z}&y={y}&x={x}'
                }
            ]
        }
    }
})