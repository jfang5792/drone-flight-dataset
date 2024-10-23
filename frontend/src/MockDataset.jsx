import {Container, Table} from 'react-bootstrap';
import dataset from '../../dataset.json';
import './App.css'

export default function MockDataset() {
    return (
    <Container>
        <Table hover responsive>
            <thead>
                <tr className='datasetColumnTitles'>
                <th>Image ID #</th>
                <th>Timestamp</th>
                <th>Location</th>
                <th>Altitude</th>
                <th>Heading</th>
                <th>File Name</th>
                <th>Camera Tilt</th>
                <th>Focal Length</th>
                <th>ISO</th>
                <th>Shutter Speed</th>
                <th>Aperture</th>
                <th>Color Temperature</th>
                <th>Image Format</th>
                <th>File Size</th>
                <th>Drone Speed</th>
                <th>Battery Level</th>
                <th>GPS Accuracy</th>
                <th>Gimbal Mode</th>
                <th>Subject Detection</th>
                <th>Image Tags</th>
                </tr>
            </thead>
            <tbody>
            {dataset.map((drone) => (
              <tr key={drone.image_id}>
                <td>{drone.image_id}</td>
                <td>{drone.timestamp}</td>
                <td>{`${drone.latitude}, ${drone.longitude}`}</td>
                <td>{`${drone.altitude_m} m`}</td>
                <td>{`${drone.heading_deg}°`}</td>
                <td>{drone.file_name}</td>
                <td>{`${drone.camera_tilt_deg}°`}</td>
                <td>{`${drone.focal_length_mm} mm`}</td>
                <td>{drone.iso}</td>
                <td>{drone.shutter_speed}</td>
                <td>{drone.aperture}</td>
                <td>{`${drone.color_temp_k} K`}</td>
                <td>{drone.image_format}</td>
                <td>{`${drone.file_size_mb} MB`}</td>
                <td>{`${drone.drone_speed_mps} m/s`}</td>
                <td>{`${drone.battery_level_pct}%`}</td>
                <td>{`${drone.gps_accuracy_m} m`}</td>
                <td>{drone.gimbal_mode}</td>
                <td>{drone.subject_detection}</td>
                <td>{drone.image_tags.join(', ')}</td>
                </tr>
                ))}
            </tbody>
        </Table>
    </Container>
    )
}
