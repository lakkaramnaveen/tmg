const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Haversine formula to calculate distance between two points
const haversineDistance = (coords1, coords2) => {
  function toRad(x) {
    return (x * Math.PI) / 180;
  }

  const lat1 = coords1.latitude;
  const lon1 = coords1.longitude;

  const lat2 = coords2.latitude;
  const lon2 = coords2.longitude;

  const R = 6371; // km

  const x1 = lat2 - lat1;
  const dLat = toRad(x1);
  const x2 = lon2 - lon1;
  const dLon = toRad(x2);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};

router.get('/users', async (req, res) => {
  const { latitude, longitude } = req.query;

  if (!latitude || !longitude) {
    return res.status(400).json({ error: 'Latitude and longitude are required' });
  }

  try {
    const users = await User.find();
    const userDistances = users.map((user) => {
      const distance = haversineDistance(
        { latitude: parseFloat(latitude), longitude: parseFloat(longitude) },
        { latitude: user.latitude, longitude: user.longitude }
      );
      //if (sortedUsers != null) {
        return { ...user.toObject(), distance };
      //}
      //return "No users found in that coordinates, please enter other coordinates";
    });

    const sortedUsers = userDistances.sort((a, b) => a.distance - b.distance);
    const usersWithinRadius = sortedUsers.filter(user => user.distance <= 10); // 10 km radius
    // if (sortedUsers!=null) {
    //     res.json(usersWithinRadius);
    // }
    // else{
    //     res.status().json({error:"No users found in that coordinates, please enter other coordinates"});
    // }
    res.json(usersWithinRadius);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
