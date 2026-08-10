import type { SkillData } from '../types';

interface SkillsProps {
  skills: SkillData[];
}

export function Skills({ skills }: SkillsProps) {
  return (
    <section id="skills" style={{ padding: '2rem 0' }}>
      <h2>Skills</h2>
      <ul>
        {skills.map((skill) => (
          <li key={skill.id}>{skill.name} - {skill.proficiency}</li>
        ))}
      </ul>
    </section>
  );
}